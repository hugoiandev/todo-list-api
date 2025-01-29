import "jest";

jest.mock("express-openid-connect", () => ({
  auth: () => require("./__mocks__/auth-middleware").mockAuthMiddleware,
}));
