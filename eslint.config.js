import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tailwind from "eslint-plugin-tailwindcss";

export default [
	{
		files: ["**/*.{js,jsx}"],
		plugins: { js },
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
	},
	{
		files: ["**/*.json"],
		plugins: { json },
		language: "json/json",
	},
	{
		files: ["**/*.jsonc"],
		plugins: { json },
		language: "json/jsonc",
	},
	{
		files: ["**/*.json5"],
		plugins: { json },
		language: "json/json5",
	},
	{
		files: ["**/*.md"],
		plugins: { markdown },
		language: "markdown/commonmark",
	},
	...tseslint.configs.recommended,
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			"react/react-in-jsx-scope": "off",
		},
	},
	...[
		...tailwind.configs["flat/recommended"],
		{
			settings: {
				tailwindcss: {
					callees: ["clsx"],
					config: false,
				},
			},
			rules: {
				"tailwindcss/no-custom-classname": "off",
			},
		},
	],
	eslintConfigPrettier,
];
