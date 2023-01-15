<script lang="ts">
	import type { Event } from '$lib/Event';
	import EventFull from './Event.svelte';
	import EventSummary from './EventSummary.svelte';

	export let events: Event[];
	export let numberOf = Infinity;
	export let order: 'ASC' | 'DEC' = 'DEC';
	export let type: 'FULL' | 'TIME' | 'SUMMARY' = 'FULL';
	let shownEvents: Event[];

	shownEvents = events.sort((a, b) => {
		let at = Math.max(a.creationDate.valueOf(), a.startDate ? a.startDate.valueOf() : 0);
		let bt = Math.max(b.creationDate.valueOf(), b.startDate ? b.startDate.valueOf() : 0);
		return order === 'DEC' ? bt - at : at - bt;
	});

	shownEvents = shownEvents.filter((e, i) => {
		return i < numberOf;
	});
</script>

{#if events.length > 0 && numberOf > 0}
	<section>
		<h4 class="sr-only">events</h4>
		{#each shownEvents as event}
			{#if type === 'FULL'}
				<!-- <EventFull {event} /> -->
				<EventSummary {event} />
			{/if}

			{#if type === 'TIME'}
				<EventSummary {event} />
			{/if}
			{#if type === 'SUMMARY'}
				<EventSummary {event} />
			{/if}
		{/each}
	</section>
{/if}

<style>
	h4 {
		text-align: center;
		margin: 0;
		padding: 0;
	}
</style>
