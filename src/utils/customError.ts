// Reusable Custom Error Class
export class CustomError extends Error {
    public statusCode: number;
    public details?: any;
  
    constructor(message: string, statusCode: number, details?: any) {
      super(message);
      this.statusCode = statusCode;
      this.details = details;
    }
  }
  