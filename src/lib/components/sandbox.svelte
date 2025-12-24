<script lang="ts">
	import { mount, unmount, type Snippet } from 'svelte';
	import type { HTMLIframeAttributes } from 'svelte/elements';

	let { children, ...props }: { children?: Snippet } & HTMLIframeAttributes = $props();

	let mounted: ReturnType<typeof mount>;
</script>

<iframe
	sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
	frameborder="0"
	onload={(e) => {
		if (!(e.currentTarget instanceof HTMLIFrameElement)) return;
		if (!e.currentTarget.contentDocument) return;
		if (mounted) unmount(mounted);
		if (!children) return;
		mounted = mount(children, {
			target: e.currentTarget.contentDocument.body
		});
	}}
	{...props}
	{@attach () => {
		return () => {
			if (mounted) unmount(mounted);
		};
	}}
>
</iframe>

<style>
	iframe {
		border-radius: var(--radius-section);
		border: 1px solid var(--color-alt-background);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}
</style>
