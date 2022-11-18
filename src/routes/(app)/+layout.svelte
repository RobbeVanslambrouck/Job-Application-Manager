<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../lib/stores/auth';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (!$user) {
			goto('/login');
		}
	});

	$: if (!$user) {
		goto('/');
	}
</script>

<aside>
	<nav>
		<ul>
			<li><a href="/dashboard">dashboard</a></li>
			<li><a href="/dashboard/account">account</a></li>
			<li><a href="/dashboard/settings">settings</a></li>
		</ul>
	</nav>
</aside>
<main>
	<slot />
</main>
