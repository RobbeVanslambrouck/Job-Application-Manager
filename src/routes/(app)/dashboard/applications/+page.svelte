<script lang="ts">
	import type { PageData } from './$types';
	import Application from '$lib/components/Application/Application.svelte';

	export let data: PageData;
	let applications = data.applications;
</script>

<section>
	<h2>Applications</h2>
	<ul>
		{#each applications as application}
			<li><Application data={application} /></li>
		{/each}
	</ul>
</section>
