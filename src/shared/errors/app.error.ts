import { HttpStatus } from '@nestjs/common';
import { AppErrorCode } from './error-codes';

export class AppError extends Error {
    public readonly code: AppErrorCode;
    public readonly statusCode: HttpStatus;
    public readonly details?: any;

    constructor(
        code: AppErrorCode,
        message: string,
        statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
        details?: any,
    ) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;

        // Maintain prototype chain for instanceof checks
        Object.setPrototypeOf(this, AppError.prototype);
    }

    static isAppError(error: any): error is AppError {
        return error instanceof AppError;
    }
}
