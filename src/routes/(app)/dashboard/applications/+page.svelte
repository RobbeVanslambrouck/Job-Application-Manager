<script lang="ts">
	import type { PageData } from './$types';
	import Application from './Application.svelte';
	import AddApplication from './AddApplication.svelte';

	export let data: PageData;
	let applications = data.applications;
</script>

<section>
	<h2 class="sr-only">Applications</h2>
	<ul>
		<li><AddApplication /></li>
		{#each applications as application}
			<li><Application data={application} /></li>
		{/each}
	</ul>
</section>

<style>
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--app-min-application-width), 1fr));
		row-gap: 1.6rem;
		column-gap: 1.6rem;
	}

	li {
		display: flex;
	}
</style>
