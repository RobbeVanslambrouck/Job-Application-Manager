<script lang="ts">
	import type { PageData } from './$types';
	import Agency from '../../Agency.svelte';

	export let data: PageData;
	let agency = data.agency;
</script>

<Agency {agency} />
