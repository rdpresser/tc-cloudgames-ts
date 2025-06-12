import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  globalIgnores([
    "**/node_modules",
    "**/dist",
    "**/coverage",
    "**/test",
    "**/tests",
    "**/*.js",
    "**/*.d.ts",
    "vitest.config.ts",
    "drizzle.config.ts",
  ]),
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
    },
  },
]);
