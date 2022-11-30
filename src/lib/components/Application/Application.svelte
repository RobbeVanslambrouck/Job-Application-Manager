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
	<div>
		<h4>application</h4>
		{#if data.appliedDate}
			<p>{applyPrefix()}{data.appliedDate.toDateString()}</p>
		{:else}
			<p>not yet applied</p>
			<input type="date" name="applyDate" id="applyDate" bind:value={date} />
			<button on:click={handleApplied}>applied</button>
		{/if}
	</div>
	<div>
		<h4>interviews</h4>
		<Interviews interviews={data.interviews} />
	</div>
	<div>
		<h4>links</h4>
		<Links links={data.links} />
	</div>
</article>
