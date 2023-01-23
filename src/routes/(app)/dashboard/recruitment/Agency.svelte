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
	<h3>{name}</h3>
	<Contacts {contacts} />
	<Companies {companies} />
</article>

<style>
	article {
		cursor: pointer;
	}
</style>
