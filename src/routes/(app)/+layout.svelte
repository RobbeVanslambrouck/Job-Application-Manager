<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../lib/stores/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Profile from './Profile.svelte';
	import Link from './Link.svelte';

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
				<li>
					<Link url="/dashboard/applications" googleIcon="grid_view">applications</Link>
				</li>
				<li>
					<Link url="/dashboard/recruitment" googleIcon="person_search">recruitment agencies</Link>
				</li>
				<!-- <li>
					<Link url="/dashboard/settings" googleIcon="settings">settings</Link>
				</li> -->
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
		min-width: 20rem;
		padding: 1rem 1.2rem;
	}

	main {
		padding: 4rem 1.2rem;
		width: 100%;
	}

	ul {
		padding: 0;
		margin: 0;
	}
	li {
		list-style: none;
		margin-bottom: 0.2rem;
	}

	li:last-child,
	li:first-child {
		padding-bottom: 0.8rem;
		margin-bottom: 0.8rem;
		border-bottom: 2px solid rgb(var(--md-sys-color-surface-variant));
	}
</style>
