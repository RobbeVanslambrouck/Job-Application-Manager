<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { logout } from '$lib/firebase';
</script>

<h2>account</h2>
<p>hello, {$user?.displayName}</p>
<button on:click={logout}>logout</button>
