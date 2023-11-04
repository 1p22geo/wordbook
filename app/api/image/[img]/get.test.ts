/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { GET } from "./route";

jest.mock("mongodb");
jest.mock("fs");
jest.mock("mime");

beforeAll(() => {
  console.info = jest.fn();
});

describe("/api/image", () => {
  it("returns image with all correct data", async () => {
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/image/image.jpg",
    });
    process.cwd = jest.fn(() => "/app");

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await GET(req as unknown as Request, { params: { img: "image.jpg" } });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/jpeg");
  });
  it("returns abstract bytestream with missing content-type", async () => {
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/image/image.exe",
    });
    process.cwd = jest.fn(() => "/app");

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await GET(req as unknown as Request, { params: { img: "image.exe" } });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/octet-stream");
  });
  it("returns 404 with missing file", async () => {
    //@ts-expect-error - we need to set the session cookie globally, it's used in a different file I don't even import, and there ARE no means of communication between them.
    global.session = "652eb26557e45bcc221d51d5";
    const { req } = createMocks({
      method: "GET",
      url: "http://localhost:3000/api/image",
    });
    process.cwd = jest.fn(() => "/app");

    Date.now = jest.fn(() => 1);
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await GET(req as unknown as Request, { params: { img: "" } });

    expect(response.status).toBe(404);
  });
});
