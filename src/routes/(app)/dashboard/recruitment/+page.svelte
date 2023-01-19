<script lang="ts">
	import type { PageData } from './$types';
	import Agency from './Agency.svelte';

	export let data: PageData;

	let agencies = data.agencies;
</script>

<h2>recruitment agencies</h2>

<ul>
	<div>
		<a href="/dashboard/recruitment/add"><i class="material-symbols-rounded">add</i></a>
	</div>
	{#each agencies as agency}
		<li><Agency {agency} /></li>
	{/each}
</ul>

<style>
	h2 {
		text-transform: capitalize;
	}
</style>
