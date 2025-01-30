import { Request, Response, NextFunction } from "express";

// Mock para o middleware de autenticação do Auth0
export const mockAuth0Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Simula um usuário autenticado
  (req as any).auth = { sub: "fake-auth0-user-id", name: "Fake User" };
  next();
};
