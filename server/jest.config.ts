export default {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  verbose: true,
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverage: true,
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
