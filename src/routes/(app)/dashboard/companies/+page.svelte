<script lang="ts">
	import type { PageData } from './$types';
	import Company from '$lib/components/Company.svelte';

	export let data: PageData;
	let companies = data.companies;
</script>

<section>
	<h2>companies</h2>
	<ul>
		{#each Object.entries(companies) as company}
			<li><Company data={company[1]} /></li>
		{/each}
	</ul>
</section>
