<script lang="ts">
	import type { Application } from '$lib/application';
	import Interviews from './Interviews.svelte';
	import Links from './Links.svelte';
	export let data: Application;

	let date = new Date().toLocaleDateString();

	let handleApplied = () => {
		data.appliedDate = new Date(date);
	};

	let hasDateHappened = (date: Date) => {
		return date.getTime() < Date.now();
	};

	let applyPrefix = () => {
		return hasDateHappened(data.appliedDate as Date) ? 'applied on: ' : 'applying on: ';
	};
</script>

<article>
	<h3>{data.companyName} - {data.jobTitle}</h3>
	{#if data.appliedDate}
		<p>{applyPrefix()}{data.appliedDate.toDateString()}</p>
	{:else}
		<p>not yet applied</p>
		<input type="date" name="applyDate" id="applyDate" bind:value={date} />
		<button on:click={handleApplied}>applied</button>
	{/if}

	<div>
		<button>add interview</button>
		<Interviews interviews={data.interviews} />
	</div>
	<Links links={data.links} />
</article>
