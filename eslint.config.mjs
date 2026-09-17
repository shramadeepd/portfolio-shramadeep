import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    "next-env.d.ts",
    "public/**",
  ]),
];

export default config;