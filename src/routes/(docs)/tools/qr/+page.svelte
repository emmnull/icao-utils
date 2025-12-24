<script lang="ts">
	import { toCanvas, toDataURL, toString } from 'qrcode';

	const formats = {
		async svg(url, width) {
			const xml = await toString(url, { type: 'svg', width });
			const blob = new Blob([xml], { type: 'image/svg+xml' });
			return URL.createObjectURL(blob);
		},
		async jpeg(url, width) {
			return toDataURL(url, { type: 'image/jpeg', width });
		},
		async png(url, width) {
			return toDataURL(url.toString(), { type: 'image/png', width });
		}
	} as const satisfies Record<string, (url: string, width: number) => Promise<string>>;

	let url = $state('');
	let w = $state(256);
</script>

<label class="input-group">
	<span class="input-group-peer"> URL: </span>
	<input type="text" class="input" bind:value={url} />
</label>
{#if url}
	<canvas
		{@attach (node) => {
			toCanvas(node, url, { width: w });
		}}
	></canvas>
	<label class="input-group">
		<span class="input-group-peer"> Dimension: </span>
		<input type="number" class="input" min="100" step="10" bind:value={w} />
		<span>px</span>
	</label>
	<menu>
		{#each Object.entries(formats) as [format, href] (format)}
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href={await href(url, w)}
				class="button-cta"
				aria-disabled={$effect.pending() ? true : undefined}
				aria-busy={$effect.pending() ? true : undefined}
				download="qrcode.{format}">Download <code>.{format}</code></a
			>
		{/each}
	</menu>
{/if}

<style>
	menu {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
</style>
