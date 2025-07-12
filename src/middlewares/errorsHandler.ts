import { ErrorRequestHandler } from "express";

export const CustomError = class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
};

function formatError(error: unknown): { message: string, statusCode: number; } {
  return {
    message: (error as { message: string; })?.message || "An error has occured",
    statusCode: (error as { statusCode: number; })?.statusCode || 500,
  };
}

export const errorsHandler: ErrorRequestHandler = (error, req, res, _) => {
  const { message, statusCode } = formatError(error);

  res.status(statusCode).json({ error: message });
};