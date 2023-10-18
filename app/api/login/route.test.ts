/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { POST } from "./route";

jest.mock("mongodb");

beforeAll(() => {
  console.info = jest.fn();
});

describe("/api/login", () => {
  it("logs in with correct credentials", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "1p22geo@gmail.com",
        pass: "qwe",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(200);
  });
  it("fails to log in with wrong credentials", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "1p22geo@gmawwwil.com",
        pass: "qwww",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(403);
  });
  it("handles unexpected exceptions", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "1p22error@gmail.com",
        pass: "qwe",
      },
    });
    console.error = jest.fn();
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(400);
    expect(console.error).toBeCalledWith(Error("test error please ignore"));
  });
  it("handles lack of environment variables", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "1p22error@gmail.com",
        pass: "qwe",
      },
    });
    console.error = jest.fn();
    process.env = { ...process.env, MONGO_URI: "yes." };
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(400);
    expect(console.info).toBeCalledWith("yes.");
    expect(console.error).toBeCalledWith(Error("test error please ignore"));
  });
});
