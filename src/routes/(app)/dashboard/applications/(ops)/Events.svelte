<script lang="ts">
	import { createEvent, type Event } from '$lib/Event';
	import EditEvent from './EditEvent.svelte';
	import EventForm from './EventForm.svelte';

	export let events: Event[];
	let formEvent = createEvent('');
	let action: 'ADD' | 'EDIT' = 'ADD';
	let showForm = false;
	let editIndex = -1;

	function handleDelete(index: number) {
		events.splice(index, 1);
		events = events;
	}

	function handleEdit(index: number) {
		editIndex = index;
		formEvent = { ...events[index] };
		showForm = true;
		action = 'EDIT';
	}

	function handleDone() {
		if (action === 'ADD') events = [...events, formEvent];
		if (action === 'EDIT' && editIndex !== -1) events[editIndex] = formEvent;
		closeForm();
	}

	function closeForm() {
		action = 'ADD';
		showForm = false;
		formEvent = createEvent('');
	}
</script>

<div>
	<ul>
		{#each events as event, index}
			<li>
				<EditEvent
					{event}
					on:delete={() => {
						handleDelete(index);
					}}
					on:edit={() => {
						handleEdit(index);
					}}
				/>
			</li>
		{/each}
	</ul>
</div>

{#if showForm}
	<EventForm bind:event={formEvent} on:done={handleDone} on:cancel={closeForm} {action} />
{:else}
	<button type="button" on:click={() => (showForm = true)}>
		<i class="material-symbols-rounded add-btn">add</i>
	</button>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	li {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.4rem;
	}

	button {
		width: 100%;
	}
</style>
