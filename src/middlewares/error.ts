import { Request, Response, NextFunction } from "express";

const error = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    res.status(400).json({
      message: error.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: `Internal server error - ${error}`,
  });
};

export default error;
