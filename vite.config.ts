import { sveltekit } from '@sveltejs/kit/vite';
import { playwright } from '@vitest/browser-playwright';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { defineConfig } from 'vitest/config';

const WIDGETS_DIR = './src/lib/widgets';

export default defineConfig({
	plugins: [
		{ ...threeMinifier(), enforce: 'pre' },
		sveltekit()
		// { name: 'zip-widgets', async closeBundle(error) {} }
	],
	// build: {
	// 	lib: {
	// 		entry: Object.fromEntries(
	// 			readdirSync(WIDGETS_DIR)
	// 				.filter((file) => file.endsWith('.svelte'))
	// 				.map((file) => [parse(file).name.toLowerCase(), join(WIDGETS_DIR, file)])
	// 		)
	// 	}
	// },
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
