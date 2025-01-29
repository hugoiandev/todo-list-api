import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const mockAuthMiddleware = (
  req: Request & { user: string | jwt.JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("No authorization header");
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(
      token,
      process.env.AUTH0_SECRET || "test-secret"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
