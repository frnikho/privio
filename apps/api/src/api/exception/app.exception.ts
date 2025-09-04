import {StatusCodes} from "http-status-codes";

export interface AppExceptionShape {
    message: string;
    status: number;
    details?: Record<string, unknown>;
}

export class AppException extends Error implements AppExceptionShape {
    message: string;
    status: number;
    details?: Record<string, unknown>;

    constructor(message: string, status: number, details?: Record<string, unknown>) {
        super(message);
        this.message = message;
        this.details = details;
        this.status = status;
    }
}

export const appException = (message: string, status: StatusCodes = StatusCodes.BAD_REQUEST, details?: Record<string, unknown>) => {
    return new AppException(message, status, details);
}