<script lang="ts">
	import type { Contact } from '$lib/recruitmentAgency';

	export let contacts: Contact[];
</script>

{#if contacts.length !== 0}
	<section>
		<h4>contacts</h4>
		<ul>
			{#each contacts as contact}
				<li>
					<p>{contact.name}</p>
					<p>{contact.phone}</p>
					<p>{contact.email}</p>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style>
	h4 {
		width: 100%;
		text-align: center;
		margin: 0;
		padding: 0;
	}

	section {
		padding: 0.4rem 0;
		text-transform: capitalize;
	}

	ul {
		padding: 0;
		display: flex;
		column-gap: 1.5rem;
		row-gap: 0.4rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	li {
		list-style: none;
	}

	a {
		color: rgb(var(--md-sys-color-on-primary-container));
	}
</style>
