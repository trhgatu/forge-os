import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as util from 'util';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly winston: winston.Logger;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';

    const consoleFormat = winston.format.combine(
      winston.format.timestamp(),
      isProduction
        ? winston.format.json()
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
              ({ timestamp, level, message, context, traceId, trace, stack }) => {
                const stackTrace = trace || stack;
                return (
                  `${timestamp} [${level}]` +
                  `${context ? ` [${context}]` : ''}` +
                  ` ${message}` +
                  `${traceId ? ` [traceId=${traceId}]` : ''}` +
                  `${stackTrace ? `\n${stackTrace}` : ''}`
                );
              },
            ),
          ),
    );

    const fileTransport = new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    });

    this.winston = winston.createLogger({
      level: isProduction ? 'info' : 'debug',
      transports: [new winston.transports.Console({ format: consoleFormat }), fileTransport],
    });
  }

  /**
   * Normalize NestJS Logger args — NestJS can pass:
   *   log(message: string, context?: string)
   *   log(message: object)
   *   log(message: string, ...optionalParams: any[])
   */
  private normalize(
    message: any,
    contextOrParams?: any,
  ): { msg: string; context?: string; extra?: Record<string, unknown> } {
    if (typeof message === 'object' && message !== null) {
      const { message: msg, context, ...rest } = message;
      let safeMsg = '';
      if (msg !== undefined) {
        safeMsg = String(msg);
      } else {
        try {
          safeMsg = JSON.stringify(message);
        } catch {
          safeMsg = util.inspect(message);
        }
      }
      return { msg: safeMsg, context, extra: rest };
    }
    const context = typeof contextOrParams === 'string' ? contextOrParams : undefined;
    return { msg: String(message), context };
  }

  log(message: any, ...optionalParams: any[]): void {
    const { msg, context, extra } = this.normalize(message, optionalParams[0]);
    this.winston.info(msg, { context, ...extra });
  }

  error(message: any, ...optionalParams: any[]): void {
    const trace = typeof optionalParams[0] === 'string' ? optionalParams[0] : undefined;
    const context =
      typeof optionalParams[1] === 'string'
        ? optionalParams[1]
        : typeof optionalParams[0] === 'string' && !trace
          ? optionalParams[0]
          : undefined;
    const { msg, extra } = this.normalize(message);
    this.winston.error(msg, { trace, context, ...extra });
  }

  warn(message: any, ...optionalParams: any[]): void {
    const { msg, context, extra } = this.normalize(message, optionalParams[0]);
    this.winston.warn(msg, { context, ...extra });
  }

  debug(message: any, ...optionalParams: any[]): void {
    const { msg, context, extra } = this.normalize(message, optionalParams[0]);
    this.winston.debug(msg, { context, ...extra });
  }

  verbose(message: any, ...optionalParams: any[]): void {
    const { msg, context, extra } = this.normalize(message, optionalParams[0]);
    this.winston.verbose(msg, { context, ...extra });
  }

  fatal(message: any, ...optionalParams: any[]): void {
    const { msg, context, extra } = this.normalize(message, optionalParams[0]);
    this.winston.error(msg, { context, level: 'fatal', ...extra });
  }
}
