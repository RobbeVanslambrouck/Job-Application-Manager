<script lang="ts">
	import type { Link } from '$lib/Link';

	export let links: Link[];
</script>

<div class="links">
	<ul>
		{#each links as link}
			<li>
				<a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.links {
		padding: 0.4rem 0;
	}

	.links {
		text-transform: capitalize;
	}
	.links ul {
		padding: 0;
		margin: 0;
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
</style>
