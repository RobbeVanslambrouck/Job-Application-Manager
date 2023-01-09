<script lang="ts">
	import { createLink, type Link } from '$lib/Link';
	import { createEventDispatcher } from 'svelte';
	import Input from './Input.svelte';

	export let links: Link[] = [];
	let name = '';
	let url = '';

	const dispatch = createEventDispatcher();

	const handleSubmit = () => {
		const link = createLink(url, name);
		name = '';
		url = '';
		links = [...links, link];

		dispatch('done');
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input label="name" required={true} bind:value={name} />
	<Input type="url" label="URL" required={true} bind:value={url} />
	<div class="buttons">
		<button type="submit">add link</button>
		<button type="button" on:click={() => dispatch('done')}>cancel</button>
	</div>
</form>

<style>
	.buttons {
		display: flex;
		gap: 2.4rem;
	}

	button {
		display: block;
		min-width: 10rem;
	}
</style>
