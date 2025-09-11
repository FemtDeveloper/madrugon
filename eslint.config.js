// ESLint 9+ flat config bridging Next.js presets
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";

const compat = new FlatCompat();

const config = [
  // Convert legacy extends into flat-compatible config
  ...compat.extends("next/core-web-vitals", "next/typescript"),
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
      // Gentle nudge to use CustomButton/CustomLink

      "@typescript-eslint/ban-ts-comment": [
        "warn",
        { "ts-expect-error": "allow-with-description" },
      ],
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
    ignores: ["node_modules/**", ".next/**", "dist/**", "build/**"],
  },
];

export default config;
