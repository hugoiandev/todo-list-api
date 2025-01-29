import request from "supertest";
import { app } from "../../server"; // A instância principal do Express
import { generateTestToken } from "../../utils/authHelper";

describe("Task routes", () => {
  it("should return tasks for an authenticated user", async () => {
    const token = generateTestToken({ sub: "1", email: "ahugaao@gmail.com" }); // Você pode gerar usando o `test-utils` ou definir manualmente
    const response = await request(app.server)
      .get("/users") // Rota protegida
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array)); // Exemplo de validação
  });

  it("should return 401 for unauthenticated request", async () => {
    const response = await request(app.server).get("/users");
    expect(response.status).toBe(401);
  });
});
