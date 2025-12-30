<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children, data } = $props();
</script>

<main>
	<aside>
		<nav>
			<h2>Widgets</h2>
			{#each Object.entries(data.widgets) as [widget, details] (widget)}
				<a
					href={resolve('/(docs)/widgets/[widget]', { widget })}
					aria-current={page.params.widget === widget ? 'page' : undefined}
					class="button-link"
					style="justify-content: start;"
				>
					{details.name}
				</a>
			{/each}
		</nav>
		<nav>
			<h2>Tools</h2>
			<a
				href={resolve('/(docs)/tools/qr')}
				aria-current={page.route.id === '/(docs)/tools/qr' ? 'page' : undefined}
				class="button-link"
				style="justify-content: start;"
			>
				QR Code
			</a>
		</nav>
		<nav>
			<h2>Views</h2>
			<a href={resolve('/views/sample')} class="button-link" style="justify-content: start;">
				QR Code
			</a>
		</nav>
	</aside>
	<article>
		{@render children()}
	</article>
</main>

<style>
	main {
		display: flex;
		flex-grow: 1;
	}

	aside {
		display: flex;
		flex-direction: column;
		margin: 1rem;
		font-size: var(--text-sm);
	}

	nav {
		padding-block: 1rem;
		display: flex;
		flex-direction: column;

		h2 {
			font-size: var(--text-xs);
			padding: 0.35rem 0.5rem;
			margin-inline: 0.5rem;
			border-radius: var(--radius-full);
			align-self: flex-start;
			opacity: 0.6;
			background: var(--color-input-background);
			font-weight: 500;
		}
	}

	article {
		padding: 2rem;
		flex: 1;
		min-height: 100%;
	}
</style>
