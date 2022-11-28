<script lang="ts">
	import type { Application } from '$lib/application';
	import Interviews from './Interviews.svelte';
	export let data: Application;

	let date = new Date().toLocaleDateString();

	let handleApplied = () => {
		// todo handle data
	};
</script>

<article>
	<h3>{data.companyName} - {data.jobTitle}</h3>
	{#if data.appliedDate}
		<p>applied on: {data.appliedDate.toDateString()}</p>
	{:else}
		<p>not yet applied</p>
		<input type="date" name="applyDate" id="applyDate" value={date} />
		<button on:click={handleApplied}>applied</button>
	{/if}

	<div>
		<button>add interview</button>
		<Interviews interviews={data.interviews} />
	</div>
</article>
