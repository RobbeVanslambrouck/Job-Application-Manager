<script lang="ts">
	import type { Application } from '$lib/Application';
	import { goto } from '$app/navigation';
	import Links from './Links.svelte';
	import Events from './Events.svelte';
	export let data: Application;

	let editLink = `/dashboard/applications/edit?id=${data.id}`;

	const handleClick = (e: MouseEvent) => {
		goto(editLink);
	};
</script>

<article tabindex="-1" on:dblclick={handleClick}>
	<h3>{data.jobTitle} at {data.companyName}</h3>
	<Events events={data.events} />
	<Links links={data.links} />
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
		background: rgba(var(--md-sys-color-primary-container), 0.6);
		color: rgb(var(--md-sys-color-on-primary-container));
		border-radius: var(--app-border-radius);
		min-height: 6rem;
		cursor: pointer;
	}

	article:focus {
		outline: auto;
	}

	h3 {
		width: 100%;
		text-align: center;
		margin: 0;
		padding: 0;
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
