<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { logout } from '$lib/firebase';
</script>

<p>hello, {$user?.displayName}</p>
<button on:click={logout}>logout</button>
