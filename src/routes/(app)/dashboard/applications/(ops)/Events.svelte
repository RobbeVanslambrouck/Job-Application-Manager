<script lang="ts">
	import type { Event } from '$lib/Event';

	export let events: Event[];
</script>

<div>
	<ul>
		{#each events as event}
			<li>
				<p class="title">
					{event.title}
				</p>
				{#if event.description !== ''}
					- <p>{event.description}</p>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	p {
		display: inline-block;
		margin: 0;
	}
	ul {
		list-style: none;
	}

	.title {
		font-weight: 500;
	}
</style>
