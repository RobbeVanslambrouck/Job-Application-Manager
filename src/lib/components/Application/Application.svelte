<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Application } from '$lib/Application';
	import { getEventRelativeTime, relativeTimeFormat, type Event } from '$lib/Event';
	import { goto } from '$app/navigation';
	export let data: Application;

	let lastEvent: Event;
	let interval: string | number | NodeJS.Timer | undefined;
	$: time = '';
	let article: HTMLElement;
	let editLink = `/dashboard/applications/edit?id=${data.id}`;

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

	const handleClick = (e: MouseEvent) => {
		goto(editLink);
	};

	const handleKeypress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			article.focus();
			console.log(article);
		}
	};
</script>

<article tabindex="-1" on:dblclick={handleClick} bind:this={article}>
	<h3>{data.jobTitle} at {data.companyName}</h3>
	<div>
		<h4 class="sr-only">Latest event</h4>
		{#if lastEvent}
			<p>{lastEvent.title} - {time}</p>
		{/if}
	</div>
	{#if data.links.length !== 0}
		<div class="links">
			<h4>links</h4>
			<ul>
				{#each data.links as link}
					<li><a href={link.url} target="_blank" rel="noreferrer">{link.name}</a></li>
				{/each}
			</ul>
		</div>
	{/if}
	<a href={editLink} class="edit"><iconify-icon inline icon="ic:round-edit" />edit</a>
</article>

<style>
	article {
		flex: 1;
		padding: 0.8rem 1.2rem;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		flex-direction: column;
		background: rgb(var(--md-sys-color-primary-container));
		color: rgb(var(--md-sys-color-on-primary-container));
		border-radius: var(--app-border-radius);
		min-height: 6rem;
		cursor: pointer;
	}

	article:focus {
		outline: auto;
	}

	h3,
	h4,
	p {
		width: 100%;
		text-align: center;
		margin: 0;
		padding: 0;
	}

	.links {
		padding: 0.4rem 0;
	}

	.links {
		text-transform: capitalize;
	}
	.links ul {
		padding: 0;
		display: flex;
		column-gap: 1.5rem;
		row-gap: 0.4rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	.links li {
		list-style: none;
	}
	.links a {
		color: rgb(var(--md-sys-color-on-primary-container));
	}
	.edit {
		width: 8rem;
		padding: 0.3rem 0;
		margin-top: auto;
		text-decoration: none;
		text-transform: capitalize;
		text-align: center;
		background-color: rgb(var(--md-sys-color-primary));
		color: rgb(var(--md-sys-color-on-primary));
		border-radius: var(--app-border-radius);
		border: none;
	}
</style>
