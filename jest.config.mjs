import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testTimeout: 60000,
  roots:[
    "<rootDir>"
  ],
  modulePaths:[
    "<rootDir>"
  ],
  "moduleDirectories":["node_modules"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: ["<rootDir>/e2e"],
};

export default createJestConfig(config);
