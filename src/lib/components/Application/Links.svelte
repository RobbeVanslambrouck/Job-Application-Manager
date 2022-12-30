<script lang="ts">
	import type { Link } from '$lib/Link';

	export let links: Link[];
</script>

<div>
	<ul>
		{#each links as link}
			<li>
				<a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
			</li>
		{/each}
	</ul>
</div>
