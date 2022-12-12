<script lang="ts">
	import type { IEvent } from '$lib/Event';

	export let events: IEvent[];
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
