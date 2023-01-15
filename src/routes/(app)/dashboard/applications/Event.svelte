<script lang="ts">
	import type { Event } from '$lib/Event';

	export let event: Event;

	function isDateInPast(date: Date) {
		return date.valueOf() - Date.now() < 0;
	}
</script>

<article>
	<h5>{event.title}</h5>
	{#if event.description}
		<p>description: {event.description}</p>
	{/if}
	<p>created on: {event.creationDate.toLocaleDateString()}</p>
	{#if event.startDate}
		<p>
			{isDateInPast(event.startDate) ? 'started' : 'starts'} : {event.startDate.toLocaleDateString()}
		</p>
	{/if}
	{#if event.endDate}
		<p>
			{isDateInPast(event.endDate) ? 'ended' : 'ends'}: {event.endDate.toLocaleDateString()}
		</p>
	{/if}
</article>

<style>
	h5,
	p {
		text-align: center;
		margin: 0;
		padding: 0;
	}

	h5 {
		font-size: 1.6rem;
		font-weight: 500;
		text-transform: capitalize;
		margin-bottom: 0.4rem;
	}

	article {
		margin: 1.2rem 0;
	}
</style>
