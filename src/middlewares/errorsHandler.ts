import { ErrorRequestHandler } from "express";

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