<script lang="ts">
	import { getEventRelativeTime, relativeTimeFormat, type Event } from '$lib/Event';
	import { onDestroy, onMount } from 'svelte';

	export let events: Event[];
	let lastEvent: Event;
	let timeStr = '';
	let interval: number | NodeJS.Timer;

	onMount(() => {
		if (events.length === 0) return;

		lastEvent = events[events.length - 1];
		timeStr = relativeTimeFormat(lastEvent);

		let rt = Math.abs(getEventRelativeTime(lastEvent));
		let timer = 1000;
		if (rt > 1000 * 60) timer = 1000 * 60;
		else if (rt > 1000 * 60 * 60) timer = 1000 * 60 * 60;
		interval = setInterval(() => {
			timeStr = relativeTimeFormat(lastEvent);
		}, timer);
	});

	onDestroy(() => {
		if (!interval) return;
		clearInterval(interval);
	});
</script>

{#if lastEvent}
	<section>
		<h4 class="sr-only">Latest event</h4>
		<p>{lastEvent.title} - {timeStr}</p>
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
