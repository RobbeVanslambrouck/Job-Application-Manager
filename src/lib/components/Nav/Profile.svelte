<script lang="ts">
	import profile from '$lib/assets/user-circle.svg';
	import { page } from '$app/stores';
	export let name: string | null | undefined;
	export let profileUrl: string | null | undefined;
</script>

<div class="profile" class:active={$page.url.pathname === '/dashboard/account'}>
	<a href="/dashboard/account">
		<h2 class="title-large">{name}</h2>
		{#if profileUrl}
			<img src={profileUrl} alt="profile" />
		{/if}
		{#if !profileUrl}
			<img src={profile} alt="profile" />
		{/if}
	</a>
</div>

<style>
	.profile {
		border-radius: var(--my-border-radius);
	}

	.profile:hover,
	.active {
		background: var(--md-sys-color-surface-1);
	}

	a {
		display: block;
		padding: 2rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;

		text-decoration: none;
		color: rgb(var(--md-sys-color-on-background));
	}

	h2 {
		margin: 0;
		text-align: center;
	}

	img {
		width: 6rem;
		height: 6rem;
		object-fit: fill;
		border-radius: 50%;
	}
</style>
