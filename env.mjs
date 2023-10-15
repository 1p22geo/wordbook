import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
      MONGO_URI: z.string().optional()
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    MONGO_URI: process.env.MONGO_URI
  },
});
