<script lang="ts">
	import { getEventRelativeTime, relativeTimeFormat, type Event } from '$lib/Event';
	import { onDestroy, onMount } from 'svelte';

	export let events: Event[];
	export let numberOf = Infinity;
	export let order: 'ASC' | 'DEC' = 'ASC';
	let shownEvents: Event[];
	let interval: number | NodeJS.Timer;
	let intervalTime: number;

	shownEvents = events.sort((a, b) => {
		let at = Math.max(a.creationDate.valueOf(), a.startDate ? a.startDate.valueOf() : 0);
		let bt = Math.max(b.creationDate.valueOf(), b.startDate ? b.startDate.valueOf() : 0);
		return order === 'DEC' ? bt - at : at - bt;
	});

	shownEvents = shownEvents.filter((e, i) => {
		return i < numberOf;
	});
	onMount(() => {
		if (events.length === 0 || numberOf === 0) return;

		// interval = setInterval(() => {
		// 	shownEvents;
		// 	intervalTime = shownEvents.reduce((p, c) => {
		// 		let relTime = Math.abs(getEventRelativeTime(c));
		// 		let minInterval = relTime < 1000 ? 1000 : relTime < 60_000 ? 60_000 : 3_600_000;
		// 		return Math.min(p, minInterval);
		// 	}, 3_600_000);
		// }, intervalTime);
	});

	onDestroy(() => {
		if (!interval) return;
		clearInterval(interval);
	});
</script>

{#if events.length > 0 && numberOf > 0}
	<section>
		<h4 class="sr-only">events</h4>
		{#each shownEvents as event}
			<p>{event.title} - {relativeTimeFormat(event)}</p>
		{/each}
	</section>
{/if}

<style>
	h4,
	p {
		width: 100%;
		text-align: center;
		margin: 0;
		padding: 0;
	}
</style>
