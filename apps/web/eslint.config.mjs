import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import hooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
            "**/*.config.js",
            "**/*.config.mjs"
        ],
    },
    js.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@next/next": nextPlugin,
            "@typescript-eslint": tsPlugin,
            "react-hooks": hooksPlugin,
            "import": importPlugin,
        },
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
                project: "./tsconfig.json",
            },
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            ...hooksPlugin.configs.recommended.rules,

            "@typescript-eslint/no-unused-vars": ["warn", {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_"
            }],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/consistent-type-imports": "error",
            "no-unused-vars": "off",

            "import/order": ["warn", {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
                "newlines-between": "always",
                "alphabetize": { "order": "asc", "caseInsensitive": true }
            }],

            "no-console": ["warn", { "allow": ["warn", "error"] }],
            "react/react-in-jsx-scope": "off",
            "@next/next/no-html-link-for-pages": "off",
            "no-undef": "off",
        },
        settings: {
            react: { version: "detect" },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json",
                },
            },
        },
    },
];