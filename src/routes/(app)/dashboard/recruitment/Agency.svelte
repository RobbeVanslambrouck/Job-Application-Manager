<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RecruitmentAgency } from '$lib/recruitmentAgency';

	export let agency: RecruitmentAgency;

	let { name, contacts, proposedCompanies } = agency;

	function handleDblClick() {
		goto(`/dashboard/recruitment/agency?name=${name}`);
	}
</script>

<article tabindex="-1" on:dblclick={handleDblClick}>
	<h3>{name}</h3>
</article>
