module.exports = {
  extends: "next/core-web-vitals",
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "import/export": "warn",
    "import/no-commonjs": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-namespace": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-console": ["warn", { allow: ["warn", "error", "log"] }],
    "no-redeclare": "warn",
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "no-useless-catch": "off",
    "react-native/no-color-literals": "off",
    "react/jsx-handler-names": "off",
    "react/jsx-no-bind": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      }
    ],
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": {
          "orderImportKind": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },
  plugins: ["react", "@typescript-eslint", "unused-imports"],
  settings: {
    "import/resolver": {
      typescript: {}
    }
  }
};
