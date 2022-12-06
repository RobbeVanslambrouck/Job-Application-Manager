<script lang="ts">
	import { page } from '$app/stores';
	export let url: string;
	export let googleIcon: string;
</script>

<div class:active={$page.url.pathname === url}>
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
		border-radius: var(--app-border-radius);
	}

	i {
		width: 2.4rem;
		height: 2.4rem;
	}

	div:hover {
		background: var(--md-sys-color-surface-1);
	}

	.active {
		background: var(--md-sys-color-surface-1);
	}
</style>
