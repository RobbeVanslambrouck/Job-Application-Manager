<script lang="ts">
	import { createLink, type Link } from '$lib/Link';

	export let links: Link[] = [];
	let name = '';
	let url = '';

	const handleSubmit = () => {
		const link = createLink(url, name);
		name = '';
		url = '';
		links = [...links, link];
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="name">name</label>
	<input type="text" name="name" id="link-name" bind:value={name} required />
	<label for="url">link</label>
	<input type="url" name="url" id="link-url" bind:value={url} required />
	<button type="submit">add link</button>
</form>

<style>
	label {
		display: block;
	}

	button {
		display: block;
	}
</style>
