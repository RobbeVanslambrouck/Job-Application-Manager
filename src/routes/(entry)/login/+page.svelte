<script lang="ts">
	import { loginWithGithub, loginWithGoogle, logout } from '../../../lib/firebase';
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	$: if ($user) {
		goto('/dashboard/applications');
	}
</script>

<section>
	<h2>login</h2>

	{#if $user}
		<p>you are all ready logged in</p>
		<button on:click={logout} class="app-button">Logout</button>
	{:else}
		<div class="login-buttons">
			<button on:click={loginWithGoogle} class="app-button google"
				><iconify-icon icon="logos:google-icon" />Login with Google</button
			>
			<button on:click={loginWithGithub} class="app-button github"
				><iconify-icon style="filter: invert(100%);" icon="logos:github-icon" />Login with Github</button
			>
		</div>
	{/if}
</section>

<style>
	h2,
	p {
		margin: 0;
		margin-bottom: 1.2rem;
	}

	h2 {
		text-align: center;
		text-transform: capitalize;
	}

	section {
		display: grid;
		grid-template-columns: max-content;
		width: fit-content;
		margin: auto;
		padding: 1rem 1.2rem;
		background-color: rgba(var(--md-sys-color-primary-container), 0.6);
		border-radius: var(--app-border-radius);
	}

	.login-buttons {
		display: grid;
		gap: 1.2rem;
	}

	button {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}

	.google {
		color: rgb(var(--md-sys-color-on-background-light));
		background-color: rgb(var(--md-sys-color-background-light));
	}

	.github {
		color: rgb(var(--md-sys-color-on-background-dark));
		background-color: rgb(var(--md-sys-color-background-dark));
	}
</style>
