<script lang="ts">
	import { toCanvas, toDataURL, toString, type QRCodeRenderersOptions } from 'qrcode';

	let svgUrl = '';

	const formats = {
		async svg(url, o) {
			URL.revokeObjectURL(svgUrl);
			const xml = await toString(url, { ...o, type: 'svg' });
			const blob = new Blob([xml], { type: 'image/svg+xml' });
			svgUrl = URL.createObjectURL(blob);
			return svgUrl;
		},
		async jpeg(url, o) {
			return toDataURL(url, { ...o, type: 'image/jpeg' });
		},
		async png(url, o) {
			return toDataURL(url, { ...o, type: 'image/png' });
		}
	} as const satisfies Record<string, (url: string, opts: typeof options) => Promise<string>>;

	let url = $state('');

	const options = $state({
		width: 500,
		color: {
			dark: '#000000',
			light: '#ffffff'
		}
	} satisfies QRCodeRenderersOptions);
</script>

<div class="wrapper">
	<menu>
		<label class="field">
			<span>URL</span>
			<input type="text" class="input" bind:value={url} />
		</label>
		<label class="field">
			<span>Dimension (px)</span>
			<input type="number" class="input" min="100" step="10" bind:value={options.width} />
			<input type="range" min="100" step="1" max="1000" bind:value={options.width} />
		</label>
		<label class="field">
			<span>Dark</span>
			<input type="color" bind:value={options.color.dark} />
		</label>
		<label class="field">
			<span>Light</span>
			<input type="color" bind:value={options.color.light} />
		</label>
	</menu>
	{#if url}
		<canvas
			{@attach (node) => {
				toCanvas(node, url, options);
			}}
		></canvas>
		<menu>
			{#each Object.entries(formats) as [format, href] (format)}
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={await href(url, options)}
					class="button-cta"
					aria-disabled={$effect.pending() ? true : undefined}
					aria-busy={$effect.pending() ? true : undefined}
					download="qrcode.{format}">Download <code>.{format}</code></a
				>
			{/each}
		</menu>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 1rem;
	}

	menu {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		font-size: var(--text-sm);
		margin-bottom: 0.5em;

		span {
			font-weight: 500;
		}
	}
</style>
