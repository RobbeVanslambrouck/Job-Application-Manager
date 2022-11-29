<script lang="ts">
	import { createLink, type Link } from '$lib/Link';

	export let links: Link[];

	let link = createLink('');
	let handleAddLink = () => {
		links = [link, ...links];
		link = createLink('');
	};
</script>

<div>
	<form action="" on:submit|preventDefault={handleAddLink}>
		<label for="">name</label>
		<input type="text" bind:value={link.name} />
		<label for="">url</label>
		<input type="url" bind:value={link.url} />
		<button type="submit">add link</button>
	</form>
	<ul>
		{#each links as link}
			<li>
				<a href={link.url}>{link.name}</a>
			</li>
		{/each}
	</ul>
</div>
