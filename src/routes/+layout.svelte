<script lang="ts">
	import '$lib/styles/base.css';
	import '$lib/styles/button-group.css';
	import '$lib/styles/button.css';
	import '$lib/styles/input-group.css';
	import '$lib/styles/input.css';
	import '$lib/styles/theme.css';
	import '@csstools/normalize.css';

	let { children } = $props();
</script>

{@render children()}
