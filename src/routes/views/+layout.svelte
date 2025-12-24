<script lang="ts">
	import { page } from '$app/state';
	import QrCode from '$lib/components/qr-code.svelte';
	import { toDataURL, toString } from 'qrcode';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let showMenu = $state(false);
	const formats = ['svg', 'jpg', 'png'] as const;
	let format = $state<(typeof formats)[number]>('svg');
	let width = $state(256);
	let qrHref = $derived.by(async () => {
		if (format === 'svg') {
			const xml = await toString(page.url.toString(), { type: 'svg', width });
			const blob = new Blob([xml], { type: 'image/svg+xml' });
			return URL.createObjectURL(blob);
		}
		const type = format === 'jpg' ? 'image/jpeg' : 'image/png';
		return await toDataURL(page.url.toString(), { type, width });
	});
</script>

<div id="viewer">
	{@render children()}
</div>

{#if showMenu}
	<menu>
		<button class="button" onclick={() => (showMenu = false)}>x</button>
		<section>
			Get QR Code
			<QrCode url={page.url} />
		</section>
	</menu>
{:else}
	<div class="toolbar">
		<button class="button" onclick={() => (showMenu = !showMenu)}>+</button>
	</div>
{/if}

<style>
	:global(:root body) {
		width: 100vw;
		height: 100vh;
		width: 100dvw;
		height: 100dvh;
		display: grid;
		grid-template-columns: [full-start] 1rem [padded-start] 1fr [padded-end] 1rem [full-end];
		grid-template-rows: [full-start] 1rem [padded-start] 1fr [padded-end] 1rem [full-end];
		place-items: center;
	}

	.toolbar {
		z-index: 1;
		grid-area: padded;
		display: flex;
		justify-self: start;
		align-self: start;
	}

	menu {
		margin: 0;
		font-size: var(--text-sm);
		display: flex;
		flex-direction: column;
		grid-area: padded;
		z-index: 1;
		border-radius: var(--radius-card);
		background: var(--color-background);
		align-self: start;
		justify-self: start;
		padding: 1rem;
	}

	#viewer {
		position: absolute;
		width: 100%;
		height: 100%;
		grid-area: full;
		background: radial-gradient(
			circle farthest-corner at bottom,
			var(--color-background),
			var(--color-alt-background)
		);
	}
</style>
