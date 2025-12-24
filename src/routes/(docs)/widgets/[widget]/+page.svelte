<script lang="ts">
	let { data } = $props();
</script>

<h1>{data.widget.metadata.name}</h1>
<p>{data.widget.metadata.description}</p>
<data.widget.default />
