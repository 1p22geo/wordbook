/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { POST } from "./route";

jest.mock("mongodb");
jest.mock("next/headers");
jest.mock("next/navigation");

beforeAll(() => {
  console.info = jest.fn();
  console.warn = jest.fn();
});

describe("/api/login", () => {
  it("logs in with correct credentials", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {},
    });
    req.json = jest.fn().mockResolvedValue(req.body);

    await POST();
    expect(console.info).toBeCalledWith("/");
    expect(console.warn).toBeCalledWith("session", "");
  });
});
