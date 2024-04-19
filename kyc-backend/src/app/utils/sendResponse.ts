import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  meta?: any;
  message?: string;
  errorMessage?: string;
  errorDetails?: any;
  stack?: any;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const {
    success,
    statusCode,
    message,
    errorMessage,
    errorDetails,
    stack,
    meta,
    data: responseData,
  } = data;

  res.status(statusCode).json({
    success,
    statusCode,
    message,
    errorMessage,
    errorDetails,
    stack,
    meta,
    data: responseData,
  });
};

export default sendResponse;
