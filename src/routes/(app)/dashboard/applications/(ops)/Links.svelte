<script lang="ts">
	import { createLink, type Link } from '$lib/Link';
	import EditLink from './EditLink.svelte';
	import LinkForm from './LinkForm.svelte';

	export let links: Link[];

	let showForm = false;
	let formLink = createLink('');
	let action: 'ADD' | 'EDIT' = 'ADD';
	let editIndex = -1;

	function handleDelete(index: number) {
		links.splice(index, 1);
		links = links;
	}

	function handleEdit(index: number) {
		editIndex = index;
		formLink = { ...links[index] };
		showForm = true;
		action = 'EDIT';
	}

	function handleDone() {
		if (action === 'ADD') links = [...links, formLink];
		if (action === 'EDIT' && editIndex !== -1) links[editIndex] = formLink;
		closeForm();
	}
	function closeForm() {
		action = 'ADD';
		showForm = false;
		formLink = createLink('');
	}
</script>

<div>
	<ul>
		{#each links as link, index}
			<li>
				<EditLink
					{link}
					on:edit={() => {
						handleEdit(index);
					}}
					on:delete={() => {
						handleDelete(index);
					}}
				/>
			</li>
		{/each}
	</ul>
</div>

{#if showForm}
	<LinkForm bind:link={formLink} on:done={handleDone} on:cancel={closeForm} {action} />
{:else}
	<button type="button" on:click={() => (showForm = true)}>
		<i class="material-symbols-rounded add-btn">add</i>
	</button>
{/if}

<style>
	ul {
		padding: 0;
	}
	li {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.4rem;
		text-transform: capitalize;
	}

	button {
		width: 100%;
	}
</style>
