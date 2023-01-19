<script lang="ts">
	import { createContact, type Contact } from '$lib/recruitmentAgency';
	import EditContact from './EditContact.svelte';
	import ContactForm from './ContactForm.svelte';

	export let contacts: Contact[];
	let formContact = createContact('');
	let action: 'ADD' | 'EDIT' = 'ADD';
	let showForm = false;
	let editIndex = -1;

	function handleDelete(index: number) {
		contacts.splice(index, 1);
		contacts = contacts;
	}

	function handleEdit(index: number) {
		editIndex = index;
		formContact = { ...contacts[index] };
		showForm = true;
		action = 'EDIT';
	}

	function handleDone() {
		if (action === 'ADD') contacts = [...contacts, formContact];
		if (action === 'EDIT' && editIndex !== -1) contacts[editIndex] = formContact;
		closeForm();
	}

	function closeForm() {
		action = 'ADD';
		showForm = false;
		formContact = createContact('');
	}
</script>

<div>
	<ul>
		{#each contacts as contact, index}
			<li>
				<EditContact
					{contact}
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
	<ContactForm bind:contact={formContact} on:done={handleDone} on:cancel={closeForm} {action} />
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
