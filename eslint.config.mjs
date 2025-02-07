import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [...compat.extends("next/core-web-vitals", "next/typescript"),  {
    rules: {
      "react/no-unescaped-entities": "off",   // Disables specific rule
      "@typescript-eslint/no-unused-vars": "warn", // Warnings instead of errors
    },
  },];
