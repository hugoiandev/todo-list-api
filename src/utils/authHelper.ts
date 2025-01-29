import jwt from "jsonwebtoken";

// Gera um token JWT simulado
export const generateTestToken = (user: { sub: string; email: string }) => {
  const payload = {
    sub: user.sub, // Identificador único do usuário (Auth0 'sub')
    email: user.email,
    iss: process.env.AUTH0_ISSUER_BASE_URL, // Issuer (Auth0)
    aud: process.env.AUTH0_CLIENT_ID, // Audience
  };

  // Para testes, use uma chave fixa ou o mesmo `jwks` do middleware

  // Gera o token com uma validade de 1 hora
  return jwt.sign(payload, process.env.AUTH0_SECRET || "test-secret", {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};
