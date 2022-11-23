<script lang="ts">
	import type { Application } from '$lib/application';
	export let data: Application;

	const toOrdinal = (num: number): string => {
		switch (num) {
			case 1:
				return '1st';
				break;
			case 2:
				return '2nd';
			case 3:
				return '3rd';
			default:
				return num + 'th';
		}
	};
</script>

<article>
	<h3>{data.companyName}</h3>
	<p>{data.jobTitle}</p>
	<p>applied on: {data.creationDate.toDateString()}</p>

	<div>
		<button>add interview</button>
		{#if data.interviews.length !== 0}
			{#each data.interviews as interview, index}
				{#if interview.title !== ''}
					<p>{interview.title}</p>
				{:else}
					<p>{toOrdinal(index + 1)} interview</p>
				{/if}
				<p>on {interview.startDate.toDateString()}</p>
			{/each}
		{:else}
			<p>no interviews jet :)</p>
		{/if}
	</div>
</article>
