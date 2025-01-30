jest.mock("express-oauth2-jwt-bearer", () => ({
  auth: jest.fn(
    () => (req: Request, res: Response, next: NextFunction) => next()
  ),
}));

import request from "supertest";
import App from "../../app";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const app = new App();
const prisma = new PrismaClient();

beforeAll(async () => {});

afterAll(async () => {});

describe("Simular requisições a api", () => {
  it("Deve retornar uma lista de tarefas", async () => {
    const res = await request(app.server).get(
      "/tasks/google-oauth2|106653194696727352547"
    );

    expect(res.status).toBe(200);
  });

  it("Deve cadastrar uma tarefa", async () => {
    const res = await request(app.server)
      .post("/tasks/google-oauth2|106653194696727")
      .send({ title: "Lavar louça" });

    expect(res.status).toEqual(201);
  });
});
