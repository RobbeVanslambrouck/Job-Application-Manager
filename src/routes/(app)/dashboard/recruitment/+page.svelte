<script lang="ts">
	import type { PageData } from './$types';
	import AddAgency from './AddAgency.svelte';
	import Agency from './Agency.svelte';

	export let data: PageData;

	let agencies = data.agencies;
</script>

<h2 class="sr-only">recruitment agencies</h2>

<ul>
	{#each agencies as agency}
		<li><Agency {agency} /></li>
	{/each}
	<AddAgency />
</ul>

<style>
	h2 {
		text-transform: capitalize;
	}

	ul {
		list-style: none;
		display: grid;
		gap: 1.2rem;
	}
</style>
