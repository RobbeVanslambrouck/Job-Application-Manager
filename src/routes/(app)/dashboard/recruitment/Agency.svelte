<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RecruitmentAgency } from '$lib/recruitmentAgency';
	import Companies from './Companies.svelte';
	import Contacts from './Contacts.svelte';

	export let agency: RecruitmentAgency;

	let { name, contacts, proposedCompanies: companies } = agency;

	function handleDblClick() {
		goto(`/dashboard/recruitment/agency?name=${name}`);
	}
</script>

<article tabindex="-1" on:dblclick={handleDblClick}>
	<div class="actions">
		<a href={`/dashboard/recruitment/edit?name=${name}`} class="action-link">
			<iconify-icon inline icon="ic:round-edit" />
		</a>

		<a href={`/dashboard/recruitment/delete?name=${name}`} class="action-link">
			<iconify-icon inline icon="ic:round-delete" />
		</a>
	</div>
	<h3>{name}</h3>
	<Contacts {contacts} />
	<Companies {companies} />
</article>

<style>
	article {
		cursor: pointer;
		padding: 0.8rem 1.2rem;
		background: rgba(var(--md-sys-color-primary-container), 0.6);
		color: rgb(var(--md-sys-color-on-primary-container));
		border-radius: var(--app-border-radius);
		display: grid;
		grid-template-columns: min-content min-content 1fr 1fr;
		align-items: center;
		gap: 0.4rem;
	}

	a {
		width: 8rem;
		padding: 0.3rem;
		margin-top: auto;
		text-decoration: none;
		text-transform: capitalize;
		text-align: center;
		background-color: rgb(var(--md-sys-color-primary));
		color: rgb(var(--md-sys-color-on-primary));
		border-radius: var(--app-border-radius);
	}

	h3 {
		margin-left: 0;
	}

	.actions {
		display: flex;
		gap: 0.4rem;
	}
	.action-link {
		width: 2.5rem;
		padding: 0.3rem 0;
		background-color: rgb(var(--md-sys-color-primary));
		color: rgb(var(--md-sys-color-on-primary));
		border-radius: var(--app-border-radius);
	}
</style>
