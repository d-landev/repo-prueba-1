import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError } from '../../errors/app.error';
import { AppErrorCodes } from '../../errors/error-codes';

export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    error: {
        code: string;
        message: string;
        details?: any;
        timestamp: string;
        path: string;
    } | null;
}

@Catch()
export class AppGlobalFilter implements ExceptionFilter {
    private readonly logger = new Logger(AppGlobalFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorCode: string = AppErrorCodes.INTERNAL_ERROR;
        let message = 'Internal server error';
        let details: any = null;

        if (exception instanceof AppError) {
            status = exception.statusCode;
            errorCode = exception.code;
            message = exception.message;
            details = exception.details;
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            // Handle validation errors or default NestJS errors
            message = (typeof res === 'string' ? res : (res as any).message) || exception.message;
            errorCode = AppErrorCodes.VALIDATION_ERROR; // Or map status to generic code
        } else {
            this.logger.error(`Unexpected error: ${exception}`, (exception as Error).stack);
        }

        const errorResponse: ApiResponse<null> = {
            success: false,
            data: null,
            error: {
                code: errorCode,
                message: message,
                details: details,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
        };

        response.status(status).json(errorResponse);
    }
}
