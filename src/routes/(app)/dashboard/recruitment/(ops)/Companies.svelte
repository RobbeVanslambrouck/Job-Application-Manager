<script lang="ts">
	import { createCompany, type Company } from '$lib/recruitmentAgency';
	import EditCompany from './EditCompany.svelte';
	import CompanyForm from './CompanyForm.svelte';

	export let companies: Company[];
	let formCompany = createCompany('');
	let action: 'ADD' | 'EDIT' = 'ADD';
	let showForm = false;
	let editIndex = -1;

	function handleDelete(index: number) {
		companies.splice(index, 1);
		companies = companies;
	}

	function handleEdit(index: number) {
		editIndex = index;
		formCompany = { ...companies[index] };
		showForm = true;
		action = 'EDIT';
	}

	function handleDone() {
		if (action === 'ADD') companies = [...companies, formCompany];
		if (action === 'EDIT' && editIndex !== -1) companies[editIndex] = formCompany;
		closeForm();
	}

	function closeForm() {
		action = 'ADD';
		showForm = false;
		formCompany = createCompany('');
	}
</script>

<div>
	<ul>
		{#each companies as company, index}
			<li>
				<EditCompany
					{company}
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
	<CompanyForm bind:company={formCompany} on:done={handleDone} on:cancel={closeForm} {action} />
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
