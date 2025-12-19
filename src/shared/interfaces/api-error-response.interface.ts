export interface ApiErrorResponse {
    success: boolean;
    statusCode: number;
    errorCode: string;
    message: string | object;
    timestamp: string;
    path: string;
    method: string;
    traceId: string;
    stack?: string;
}
