module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.{test.,spec.}{ts,tsx}",
    "!src/index.ts",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
