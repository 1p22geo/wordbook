/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { POST } from "./route";

jest.mock("mongodb");

beforeAll(() => {
  console.info = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

describe("/api/login", () => {
  it("should register with correct data", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "1p22geo2@gmail.com",
        pass: "qwe",
        name: "Bartosz G",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(201);
  });
  it("should handle unexpected exceptions", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "1p22error@gmail.com",
        pass: "qwe",
        name: "Bartosz G",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(400);
    expect(console.error).toBeCalledWith(Error("test error please ignore"));
  });
  it("should handle environment variables", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "1p22error@gmail.com",
        pass: "qwe",
        name: "Bartosz G",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    process.env = { ...process.env, MONGO_URI: "yes." };

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(400);
    expect(console.info).toBeCalledWith("yes.");
    expect(console.error).toBeCalledWith(Error("test error please ignore"));
  });
});
