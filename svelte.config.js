import adapter from '@sveltejs/adapter-static';
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
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
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
