// ESLint 9 flat config (eslint-config-next 16 ships native flat configs)
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // Keep the codebase building; you can tighten these later
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Prefer TanStack Query for data fetching in components
      "no-restricted-imports": [
        "warn",
        {
          name: "swr",
          message:
            "Use @tanstack/react-query instead of swr per project rules.",
        },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        { "ts-expect-error": "allow-with-description" },
      ],
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-unsafe-function-type": "off",
      // New in eslint-plugin-react-hooks 7 (React Compiler rules). Pre-existing
      // violations are reported as warnings so they can be fixed incrementally.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "dist/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
