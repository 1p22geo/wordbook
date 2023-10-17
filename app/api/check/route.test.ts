/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { POST } from "./route";

jest.mock("mongodb");

describe("/api/check", () => {
  it("Checks a correct session", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { session: "652eb26557e45bcc221d51d5" },
    });
    req.json = jest.fn().mockResolvedValue(req.body);
    const response = await POST(req as unknown as Request);

    expect(response.status).toBe(200);
  });
});
