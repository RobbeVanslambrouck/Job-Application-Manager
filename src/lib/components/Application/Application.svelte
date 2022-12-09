<script lang="ts">
	import type { Application } from '$lib/Application';
	export let data: Application;

	let lastEvent = data.events[data.events.length - 1];
</script>

<article>
	<h3>{data.jobTitle} at {data.companyName}</h3>
	<div>
		<h4 class="sr-only">Latest event</h4>
		{#if lastEvent}
			<p>{lastEvent.title} - {lastEvent.timeFromNow()}</p>
		{/if}
	</div>
	{#if data.links.length !== 0}
		<div>
			<h4>links</h4>
			<ul>
				{#each data.links as link}
					<li>{link.name}</li>
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
