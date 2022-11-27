<script lang="ts">
	import type { Application } from '$lib/application';
	import Interviews from './Interviews.svelte';
	export let data: Application;
</script>

<article>
	<h3>{data.companyName}</h3>
	<p>{data.jobTitle}</p>
	{#if data.appliedDate}
		<p>applied on: {data.appliedDate.toDateString()}</p>
	{/if}

	<div>
		<button>add interview</button>
		<Interviews interviews={data.interviews} />
	</div>
</article>
