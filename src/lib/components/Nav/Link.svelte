<script lang="ts">
	export let url: string;
	export let googleIcon: string;
</script>

<div>
	<a href={url} class="body-large">
		<i class="material-symbols-rounded">{googleIcon}</i>
		<slot />
	</a>
</div>

<style>
	a {
		display: flex;
		gap: 2.4rem;
		text-decoration: none;
		color: rgb(var(--md-sys-color-on-background));
	}

	div {
		padding: 0.8rem 1.2rem;
		border-radius: var(--my-border-radius);
	}

	i {
		width: 2.4rem;
		height: 2.4rem;
	}

	div:hover {
		background: var(--md-sys-color-surface-1);
	}
</style>
