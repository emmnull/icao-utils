<script lang="ts" module>
	export const formats = ['svg', 'jpg', 'png'] as const;
</script>

<script lang="ts">
	import { toCanvas, toDataURL, toString } from 'qrcode';

	let {
		url,
		width = $bindable(500),
		format = $bindable('svg')
	}: {
		url: URL | string;
		width?: number;
		format?: (typeof formats)[number];
	} = $props();

	let href = $derived.by(async () => {
		if (format === 'svg') {
			const xml = await toString(url.toString(), { type: 'svg', width });
			const blob = new Blob([xml], { type: 'image/svg+xml' });
			return URL.createObjectURL(blob);
		}
		const type = format === 'jpg' ? 'image/jpeg' : 'image/png';
		return await toDataURL(url.toString(), { type, width });
	});
</script>

<div class="root">
	<canvas
		{@attach (node) => {
			toCanvas(node, url.toString());
			// return () => {};
		}}
	></canvas>
	<label class="input-group">
		<input type="number" class="input" bind:value={width} />
		<span>px</span>
	</label>
	<div class="input-group">
		<select class="input" bind:value={format}>
			{#each formats as value (value)}
				<option {value}>{value}</option>
			{/each}
		</select>
		<svelte:boundary>
			<a
				href={await href}
				class="button"
				aria-disabled={$effect.pending() ? true : undefined}
				type="submit"
				download="qrcode.{format}">Download</a
			>
		</svelte:boundary>
	</div>
</div>

<style>
</style>
