import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [
		[ 'html' ],
		[ 'allure-playwright' ],
	],
	use: {
		trace: 'retry-with-trace',
		screenshot: 'only-on-failure',
	},

	projects: [
	{
		name: 'chromium',
		use: { ...devices['Desktop Chrome'] },
	},
	],

});
