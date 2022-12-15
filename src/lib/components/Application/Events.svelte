<script lang="ts">
	import type { Event } from '$lib/Event';

	export let events: Event[];
</script>

<div>
	<ul>
		{#each events as event}
			<li>
				<p>{event.title}</p>
				<p>{event.description}</p>
			</li>
		{/each}
	</ul>
</div>
