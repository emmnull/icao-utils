import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const md = '.md';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		mdsvex({
			extension: md
		}),
		vitePreprocess()
	],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		// inlineStyleThreshold: 4_096
		// output: {
		// 	bundleStrategy: 'inline'
		// }
		experimental: {
			remoteFunctions: true
		}
	},
	compilerOptions: {
		cssHash({ hash, filename, css }) {
			return `icao-${hash(filename ?? css)}`;
		},
		experimental: {
			async: true
		}
	},
	extensions: ['.svelte', md]
};

export default config;
