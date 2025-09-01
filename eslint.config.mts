import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		// Настраиваем опции языка для проверки типа
		languageOptions: {
			parserOptions: {
				project: true,
			},
		},
		rules: {
			'@typescript-eslint/no-floating-promises': 'error',
			// Здесь добавляем другие правила
		},
	},
	{
		// Здесь указываем, какие файлы и папки игнорировать
		ignores: ['dist/**', 'node_modules/**', 'playwright.config.ts', 'playwright-report/**'],
	}
]);
