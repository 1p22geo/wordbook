/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { GET } from "./route";

jest.mock("mongodb");

beforeAll(() => {
  console.info = jest.fn();
});

describe("/api/post", () => {
  it("returns posts with all correct data", async () => {
    //@ts-expect-error - we need to set the session cookie globally, it's used in a different file I don't even import, and there ARE no means of communication between them.
    global.session = "652eb26557e45bcc221d51d5";
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/post",
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await GET(req as unknown as Request);

    expect(response.status).toBe(200);
  });
  it("reacts to no session cookie", async () => {
    //@ts-expect-error - as above
    global.session = "";
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/post",
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await GET(req as unknown as Request);
    expect(response.status).toBe(401);
  });
  it("reacts to wrong session", async () => {
    //@ts-expect-error - as above
    global.session = "652eb26557e45bcc221d0000";
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/post",
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await GET(req as unknown as Request);
    expect(response.status).toBe(403);
  });

  it("reacts to expired session", async () => {
    //@ts-expect-error - as above
    global.session = "652eb26557e45bcc221d51d5";
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/post",
    });

    Date.now = jest.fn(() => 100000000);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await GET(req as unknown as Request);

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ error: "Session expired" });
  });
  it("reacts to database error", async () => {
    //@ts-expect-error - as above
    global.session = "652eb26557e45bcc221d51ff";
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/post",
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await GET(req as unknown as Request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({});
  });
  it("reacts to lack of environment variables", async () => {
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/post",
    });
    console.error = jest.fn();
    req.json = jest.fn().mockResolvedValue(req.body);
    process.env = { ...process.env, MONGO_URI: "yes." };
    const response = await GET(req as unknown as Request);

    expect(response.status).toBe(400);
    expect(console.info).toBeCalledWith("yes.");
  });
});
