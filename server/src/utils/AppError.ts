// server/src/utils/AppError.ts
export class AppError extends Error {
  status: number;
  details?: unknown;  // <-- this can hold validation details, extra info, etc.

  constructor(message: string, status: number = 500, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

