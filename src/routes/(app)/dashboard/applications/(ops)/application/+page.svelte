<script lang="ts">
	import type { PageData } from './$types';
	import Application from '../../Application.svelte';

	export let data: PageData;
	let application = data.application;
</script>

<Application {application} />
