import { defineConfig, devices } from '@playwright/test';
import type { GitHubActionOptions } from '@estruyf/github-actions-reporter';

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [
		[ 'junit', { 
    		outputFile: 'results/test-results.xml',
    		embedAnnotationsAsProperties: true,
  		} ],
		[ 'html' ],
		[ process.env.CI ? 'github' : 'list' ],
		[ '@estruyf/github-actions-reporter', <GitHubActionOptions>{
      		useDetails: true,
      		showError: true
    	} ],
	],
	use: {
		trace: 'retry-with-trace',
		screenshot: 'only-on-failure',
		baseURL: 'https://dreamisland.ru/',
		video: 'retain-on-failure',
	},

	projects: [
	{
		name: 'chromium',
		use: { ...devices['Desktop Chrome'] },
	},
	],

});
