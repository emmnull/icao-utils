<script lang="ts">
	let { value = $bindable() }: { value: number } = $props();
</script>

<div>
	<button onclick={() => value--}> - </button>
	<span>{value}</span>
	<button onclick={() => value++}> + </button>
</div>

<style>
</style>
