<script lang="ts">
	import type { Company } from '$lib/recruitmentAgency';

	export let companies: Company[];
</script>

{#if companies.length !== 0}
	<section>
		<h4>companies</h4>
		<ul>
			{#each companies as company}
				<li>
					<p>{company.name}</p>
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
