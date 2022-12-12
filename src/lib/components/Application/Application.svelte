<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Application } from '$lib/Application';
	import { getEventRelativeTime, relativeTimeFormat, type IEvent } from '$lib/Event';
	export let data: Application;

	let lastEvent: IEvent;
	let interval: string | number | NodeJS.Timer | undefined;
	$: time = '';
	onMount(() => {
		if (data.events.length === 0) return;

		lastEvent = data.events[data.events.length - 1];
		time = relativeTimeFormat(lastEvent);

		let timer = 1000;
		let rt = Math.abs(getEventRelativeTime(lastEvent));
		if (rt < 1000 * 60) timer = 1000;
		else if (rt < 1000 * 60 * 60) timer = 1000 * 60;
		else if (rt < 1000 * 60 * 60 * 24) timer = 1000 * 60 * 60;

		interval = setInterval(() => {
			time = relativeTimeFormat(lastEvent);
		}, timer);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<article>
	<h3>{data.jobTitle} at {data.companyName}</h3>
	<div>
		<h4 class="sr-only">Latest event</h4>
		{#if lastEvent}
			<p>{lastEvent.title} - {time}</p>
		{/if}
	</div>
	{#if data.links.length !== 0}
		<div>
			<h4>links</h4>
			<ul>
				{#each data.links as link}
					<li><a href={link.url} target="_blank" rel="noreferrer">{link.name}</a></li>
				{/each}
			</ul>
		</div>
	{/if}
</article>

<style>
	article {
		padding: 0.8rem 1.2rem;
		display: flex;
		gap: 0.4rem;
		flex-direction: column;
		background: rgb(var(--md-sys-color-primary-container));
		color: rgb(var(--md-sys-color-on-primary-container));
		border-radius: var(--app-border-radius);
		min-height: 6rem;
		cursor: pointer;
	}

	h3,
	h4,
	p {
		width: 100%;
		text-align: center;
		margin: 0;
		padding: 0;
	}
</style>
