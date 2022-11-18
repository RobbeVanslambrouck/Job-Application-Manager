<script lang="ts">
	import { loginWithGoogle, logout } from '../../../lib/firebase';
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	$: if ($user) {
		goto('/dashboard');
	}
</script>

<h2>login</h2>

{#if $user}
	<p>you are all ready logged in</p>
	<button on:click={logout}>Logout</button>
{:else}
	<button on:click={loginWithGoogle}>Login with google</button>
{/if}
