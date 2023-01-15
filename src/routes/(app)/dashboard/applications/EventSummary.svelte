<script lang="ts">
	import { relativeTimeFormat, type Event } from '$lib/Event';
	import { onDestroy } from 'svelte';

	export let event: Event;
	let relTimeFormat = relativeTimeFormat(event);
	let interval: number | NodeJS.Timer;

	interval = setInterval(() => {
		relTimeFormat = relativeTimeFormat(event);
	}, 1000);

	onDestroy(() => {
		if (!interval) return;
		clearInterval(interval);
	});
</script>

<article>
	<h5>{event.title}</h5>
	<p>- {relTimeFormat}</p>
</article>

<style>
	h5,
	p {
		display: inline-block;
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
