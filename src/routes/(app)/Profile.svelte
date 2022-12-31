<script lang="ts">
	import profileAlt from '$lib/assets/user-circle.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	export let name: string | null | undefined;
	export let profileUrl: string | null | undefined;

	let loaded = false;
	let failed = false;
	onMount(() => {
		let profileImg = new Image();
		if (!profileUrl) {
			failed = true;
			return;
		}
		profileImg.src = profileUrl;

		profileImg.onload = () => {
			loaded = true;
		};

		profileImg.onerror = () => {
			failed = true;
		};
	});
</script>

<div class="profile" class:active={$page.url.pathname === '/dashboard/account'}>
	<a href="/dashboard/account">
		<h2 class="title-large">{name}</h2>
		{#if !loaded || failed}
			<img src={profileAlt} alt="profile" />
		{/if}
		{#if loaded}
			<img src={profileUrl} alt="profile" />
		{/if}
	</a>
</div>

<style>
	.profile {
		border-radius: var(--app-border-radius);
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
