<svelte:options customElement="icao-counter" />

<script lang="ts">
	let { value = $bindable(0) }: { value?: number } = $props();
</script>

<fieldset>
	<button onclick={() => value--} class="button"> - </button>
	<input class="input" type="number" bind:value />
	<button onclick={() => value++} class="button"> + </button>
</fieldset>

<style>
	@import '$lib/styles/theme.css';
	@import '$lib/styles/button.css';
	@import '$lib/styles/input.css';
</style>
