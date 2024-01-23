/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { dynamic, POST } from "./route";

jest.mock("mongodb");

beforeAll(() => {
  console.info = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

describe("/api/user", () => {
  it("renders dynamically", () => {
    expect(dynamic).toBeTruthy();
  });
  it("should return a user", async () => {
    process.env = { ...process.env, MONGO_URI: "yes." };
    const { req } = createMocks({
      method: "POST",
      body: {
        id: "652eb25c57e45bcc221d51d4",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await POST(req as unknown as Request);
    expect(console.info).toHaveBeenCalledWith("yes.");
    expect(response.status).toBe(200);
  });
  it("should react to wrong user id", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        id: "tere fere kuku",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Wrong ID" });
  });
  it("should react to missing user", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        id: "652eb25c57e45bcc221fffff",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "No such user" });
  });
  it("should react to missing userdata", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        id: "653cdf77477ebd1fd477c821",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Something weird happened. This should be impossible." });
  });
  it("should handle unexpected exceptions", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        id: "653cdf77477ebd1fd477ffff",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(400);
    expect(console.error).toHaveBeenCalledWith(Error("test error please ignore"));
  });
  it("should handle environment variables", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        id: "653cdf77477ebd1fd477ffff",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    process.env = { ...process.env, MONGO_URI: "yes." };

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(400);
    expect(console.error).toHaveBeenCalledWith(Error("test error please ignore"));
    expect(console.info).toHaveBeenCalledWith("yes.");
  });
  it("should handle lack of environment variables", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        id: "653cdf77477ebd1fd477ffff",
      },
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    process.env = { ...process.env, MONGO_URI: undefined };

    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(400);
    expect(console.error).toHaveBeenCalledWith(Error("test error please ignore"));
    expect(console.info).toHaveBeenCalledWith("");
  });
});
