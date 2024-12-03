import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  details?: any; 
}

// Middleware for handling errors
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // TODO:replace with a proper logger in production
  console.error(`[Error] ${err.message}`);
  console.error(err.stack);

  // Default error properties
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send a detailed error response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    details: err.details || null, 
    timestamp: new Date().toISOString(),
    path: req.originalUrl, // Log the API endpoint that caused the error
  });
};

export default errorHandler;
