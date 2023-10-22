/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { POST } from "./route";
import { dynamic } from "./route.post";

jest.mock("mongodb");

beforeAll(() => {
  console.info = jest.fn();
});

describe("/api/post", () => {
  it("renders dynamically", async () => {
    expect(dynamic).toBeTruthy();
  });
  it("reacts to no data submitted", async () => {
    //@ts-expect-error - as in ./get.test.ts
    global.session = "652eb26557e45bcc221d51d5";
    const { req } = createMocks({
      method: "POST",
      body: {},
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "no json?" });
  });
  it("inserts posts with all correct data", async () => {
    //@ts-expect-error - as in ./get.test.ts
    global.session = "652eb26557e45bcc221d51d5";
    const { req } = createMocks({
      method: "POST",
      body: { content: "new post" },
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(201);
  });
  it("reacts to no session cookie", async () => {
    //@ts-expect-error - as in ./get.test.ts
    global.session = "";
    const { req } = createMocks({
      method: "POST",
      body: { content: "new post" },
    });
    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(401);
  });
  it("reacts to wrong session", async () => {
    //@ts-expect-error - as in ./get.test.ts
    global.session = "652eb26557e45bcc221d0000";
    const { req } = createMocks({
      method: "POST",
      body: { content: "new post" },
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(403);
  });
  it("reacts to expired session", async () => {
    //@ts-expect-error - as in ./get.test.ts
    global.session = "652eb26557e45bcc221d51d5";
    const { req } = createMocks({
      method: "POST",
      body: { content: "new post" },
    });

    Date.now = jest.fn(() => 100000000);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ error: "Session expired" });
  });
  it("reacts to deleted user", async () => {
    //@ts-expect-error - as in ./get.test.ts
    global.session = "652eb26557e45bcc221d51d8";
    const { req } = createMocks({
      method: "POST",
      body: { content: "new post" },
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);
    expect(response.status).toBe(501);
  });
  it("reacts to database error", async () => {
    console.error = jest.fn();
    //@ts-expect-error - as in ./get.test.ts
    global.session = "652eb26557e45bcc221d51ff";
    const { req } = createMocks({
      method: "POST",
      body: { content: "new post" },
    });

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(console.error).toBeCalledWith(Error("test error please ignore"));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({});
  });
  it("reacts to lack of environment variables", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { content: "new post" },
    });
    console.error = jest.fn();
    req.json = jest.fn().mockResolvedValue(req.body);
    process.env = { ...process.env, MONGO_URI: "yes." };
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(400);
    expect(console.info).toBeCalledWith("yes.");
  });
});
