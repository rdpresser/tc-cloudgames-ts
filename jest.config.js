const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^application/(.*)$': '<rootDir>/src/application/$1',
    '^domain/(.*)$': '<rootDir>/src/domain/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
  },
  testMatch: ['**/test/**/*.test.ts']
};
