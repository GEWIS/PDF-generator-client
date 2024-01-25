export declare enum HTTPStatus {
    NoContent = "No Content",
    BadRequest = "Bad Request",
    Unauthorized = "Unauthorized",
    Forbidden = "Forbidden",
    InternalServerError = "Internal Server Error",
    NotFound = "Not Found"
}
export interface ValidateErrorJSON {
    message: 'Validation failed';
    details: {
        [name: string]: unknown;
    };
}
export interface InternalError {
    message: 'Internal Server Error';
}
export declare class ApiError extends Error {
    statusCode: number;
    constructor(status: HTTPStatus, message?: string);
}
