import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { v4 as uuidv4 } from 'uuid';
import { ErrorCode } from '../constants/error-codes';
import { BaseDomainException } from '../exceptions/base-domain.exception';
import { LoggerService } from '../logging/logger.service';
import { ApiErrorResponse } from '../interfaces/api-error-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly logger: LoggerService,
    ) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();

        // 1. Generate/Extract Trace ID
        const traceId = request.headers['x-trace-id'] || uuidv4();
        const path = httpAdapter.getRequestUrl(request);
        const method = httpAdapter.getRequestMethod(request);

        // 2. Determine Status, ErrorCode and Message
        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
        let message: string | object = 'Internal server error';
        let stack: string | undefined;

        if (exception instanceof HttpException) {
            httpStatus = exception.getStatus();
            const responseBody = exception.getResponse();
            message = typeof responseBody === 'object' && 'message' in responseBody
                ? (responseBody as any).message
                : responseBody;
            errorCode = ErrorCode.VALIDATION_ERROR; // Default fallback for HttpExceptions

            // Map standard NestJS exceptions to codes if needed
            if (httpStatus === HttpStatus.UNAUTHORIZED) errorCode = ErrorCode.UNAUTHORIZED;
            if (httpStatus === HttpStatus.FORBIDDEN) errorCode = ErrorCode.FORBIDDEN;

            if (httpStatus === HttpStatus.NOT_FOUND) {
                if (typeof message === 'string' && message.startsWith('Cannot ')) {
                    errorCode = ErrorCode.ROUTE_NOT_FOUND;
                } else {
                    errorCode = ErrorCode.NOT_FOUND;
                }
            }

        } else if (exception instanceof BaseDomainException) {
            httpStatus = exception.statusCode;
            errorCode = exception.errorCode as ErrorCode;
            message = exception.message;
        } else if (exception instanceof Error) {
            // Init stack for logging
            stack = exception.stack;

            // MongoDB Duplicate Key Error (Code 11000)
            // Note: we might need more specific check depending on Mongoose version/driver
            if ((exception as any).code === 11000) {
                httpStatus = HttpStatus.CONFLICT;
                errorCode = ErrorCode.DB_DUPLICATE_KEY;
                message = 'Duplicate key error';
            }
        }

        // 3. Prepare Response Body
        const isProduction = process.env.NODE_ENV === 'production';

        const responseBody: ApiErrorResponse = {
            success: false,
            statusCode: httpStatus,
            errorCode,
            message,
            timestamp: new Date().toISOString(),
            path,
            method,
            traceId,
            stack: isProduction ? undefined : stack,
        };

        // 4. Log Error
        const logContext = `GlobalFilter [${method} ${path}]`;
        if (httpStatus >= 500) {
            this.logger.error(
                `[${errorCode}] ${JSON.stringify(message)}`,
                stack,
                logContext,
                traceId
            );
        } else {
            this.logger.warn(
                `[${errorCode}] ${JSON.stringify(message)} [traceId=${traceId}]`,
                logContext
            );
        }

        // 5. Send Response
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
