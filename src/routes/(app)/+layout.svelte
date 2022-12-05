<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../lib/stores/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Profile from '$lib/components/Nav/Profile.svelte';

	onMount(() => {
		if (!$user) {
			goto('/login');
		}
	});

	$: if (browser) {
		if (!$user) {
			goto('/login');
		}
	}

	$: profileAgs = {
		name: $user?.displayName,
		profileUrl: $user?.photoURL
	};
</script>

<div class="page">
	<aside>
		<nav>
			<ul>
				<li><Profile {...profileAgs} /></li>
				<li><a href="/dashboard/applications">applications</a></li>
				<li><a href="/dashboard/interim">interim</a></li>
				<li><a href="/dashboard/settings">settings</a></li>
			</ul>
		</nav>
	</aside>
	<main>
		<slot />
	</main>
</div>

<style>
	.page {
		display: flex;
	}
	aside {
		width: 20rem;
		min-height: 100vh;
		padding: 1rem 1.2rem;
	}
	ul {
		padding: 0;
		margin: 0;
	}
	li {
		list-style: none;
	}
</style>
