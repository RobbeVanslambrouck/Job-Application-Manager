<script lang="ts">
	import type { Link } from '$lib/Link';
	import { createEventDispatcher } from 'svelte';
	import Input from './Input.svelte';

	export let link: Link;
	export let action: 'ADD' | 'EDIT';

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		dispatch('done');
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input label="name" required={true} bind:value={link.name} />
	<Input type="url" label="URL" required={true} bind:value={link.url} />
	<div class="buttons">
		<button type="submit">{action === 'ADD' ? 'add' : 'edit'} link</button>
		<button type="button" on:click={() => dispatch('cancel')}>cancel</button>
	</div>
</form>

<style>
	.buttons {
		display: flex;
		gap: 2.4rem;
	}

	button {
		width: 100%;
	}

	form:invalid button[type='submit'] {
		background-color: rgba(var(--md-sys-color-error-container));
		color: rgba(var(--md-sys-color-error));
		cursor: not-allowed;
	}
</style>
