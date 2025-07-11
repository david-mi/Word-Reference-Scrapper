import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  ...[
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
      plugins: {
        "@stylistic": stylistic
      },
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "no-duplicate-imports": "error",
        "@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
        "@stylistic/quotes": ["error", "double"],
        "@stylistic/comma-dangle": ["error", {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "imports": "never",
          "exports": "never",
          "functions": "never",
        }],
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            "args": "after-used",
            "argsIgnorePattern": "^_",
            "caughtErrors": "all",
            "caughtErrorsIgnorePattern": "^_",
            "destructuredArrayIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "ignoreRestSiblings": true
          }
        ]
      }
    },
  ].map(conf => ({
    ...conf,
    files: ["src/**/*.ts"],
  })),
);