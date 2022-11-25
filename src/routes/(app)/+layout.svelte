<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../lib/stores/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

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
</script>

<aside>
	<nav>
		<ul>
			<li><a href="/dashboard/applications">applications</a></li>
			<li><a href="/dashboard/interim">interim</a></li>
			<li><a href="/dashboard/account">account</a></li>
			<li><a href="/dashboard/settings">settings</a></li>
		</ul>
	</nav>
</aside>
<main>
	<slot />
</main>
