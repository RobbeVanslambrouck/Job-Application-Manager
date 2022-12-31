<script lang="ts">
	import type { Interview } from '$lib/Interview';
	export let interviews: Interview[];

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

<div>
	{#if interviews.length !== 0}
		{#each interviews as interview, index}
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
