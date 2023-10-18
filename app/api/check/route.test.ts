/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { dynamic, POST } from "./route";

jest.mock("mongodb");

beforeAll(() => {
  console.info = jest.fn();
});

describe("/api/check", () => {
  it("renders dynamically", () => {
    expect(dynamic).toBeTruthy();
  });
  it("Checks a correct session", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { session: "652eb26557e45bcc221d51d5" },
    });
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(200);
  });
  it("Checks a nonexistent session", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { session: "652eb26557e45bcc221d0000" },
    });
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(404);
  });
  it("Checks a nonexistent user", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { session: "652eb26557e45bcc221d51d8" },
    });
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(501);
  });
  it("reacts to unexpected errors", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { session: "652eb26557e45bcc221d51ff" },
    });
    console.error = jest.fn();
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(400);
    expect(console.error).toBeCalledWith(Error("test error please ignore"));
  });
  it("reacts to lack of environment variables", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { session: "652eb26557e45bcc221d51ff" },
    });
    console.error = jest.fn();
    req.json = jest.fn().mockResolvedValue(req.body);
    process.env = { ...process.env, MONGO_URI: "yes." };
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(400);
    expect(console.error).toBeCalledWith(Error("test error please ignore"));
    expect(console.info).toBeCalledWith("yes.");
  });
});
