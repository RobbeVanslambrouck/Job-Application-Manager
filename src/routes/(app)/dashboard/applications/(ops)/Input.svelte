<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string;
	export let value = '';
	export let placeholder = '';
	export let required = false;
	export let type: 'text' | 'url' | 'email' | 'datetime-local' = 'text';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

	let input: HTMLInputElement;

	let valid = true;
	let validationMsg = '';

	function validate() {
		valid = input.validity.valid;
		validationMsg = input.validationMessage;
	}

	onMount(() => {
		validate();
	});
</script>

<label for={label}>{label}:</label>
<input
	use:typeAction
	name={label}
	{placeholder}
	id={label}
	bind:value
	{required}
	bind:this={input}
	on:input={validate}
/>
<p class="validation" hidden={valid}>{validationMsg}</p>

<style>
	.validation {
		color: rgba(var(--md-sys-color-error));
		margin: 0;
		font-family: var(--md-sys-typescale-caption-font);
		font-weight: var(--md-sys-typescale-caption-weight);
		font-size: var(--md-sys-typescale-caption-size);
		line-height: var(--md-sys-typescale-caption-line-height);
		letter-spacing: var(--md-sys-typescale-caption-tracking);

		position: relative;
		top: -2rem;
		height: 0;
	}

	label {
		display: block;
		text-transform: capitalize;
	}

	input {
		border-color: rgba(var(--md-sys-color-on-surface));
		border-image: none;
		border-width: 0.2rem;
		border-radius: 5px;
		border-style: double;
		padding: 0.2rem 0.4rem;
		margin-bottom: 2rem;
		width: calc(100% - 1.2rem);
	}

	input:focus {
		outline: none;
		border-style: dashed;
	}

	input:invalid {
		border-color: rgba(var(--md-sys-color-error));
	}
</style>
