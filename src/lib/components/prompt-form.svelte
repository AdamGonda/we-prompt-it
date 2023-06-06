<script>
	import { toast } from '@zerodevx/svelte-toast';
	import { enhance } from '$app/forms';
	import { formDataToObject } from '$lib/utils';
	import { promptSchema } from '$lib/yup-schemas';
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import Tags from './tags.svelte';

	export let onSuccess = (data) => {};
	export let onError = (error) => {};
	export let formName;
	export let data;
	export let action;
	export let type = 'create';
	export let form = null;

	let _form;
	let errors = {};
	let showAddNewModel = false;
	let isTouched = {
		name: false,
		description: false,
		content: false,
		newModelName: false,
		newModelLink: false
	};

	$: disabled = getDisabled(errors, isTouched);
	$: form = _form;

	onMount(() => {
		if (type === 'fork') {
			validateForm();
		}

		Array.from(_form.elements).forEach((el) => {
			if (el.tagName === 'TEXTAREA') {
				el.style.height = 'auto';
				el.style.height = `${el.scrollHeight}px`;
			}
		});
	});

	function isSelected(model) {
		return model.id == data.selectedModelId;
	}

	async function validateForm() {
		errors = {};
		const formData = formDataToObject(new FormData(_form));

		try {
			promptSchema.validateSync(formData, { abortEarly: false });
		} catch (error) {
			error.inner.forEach((err) => {
				errors[err.path] = err.errors[0];
			});
		}

		nameCheck(formData);
	}

	async function nameCheck(formData) {
		if (formData.name) {
			const isExisting = type === 'edit';
			const promptId = isExisting ? `&promptId=${data.id}` : '';

			let url = `/api/name-check?proposedName=${formData.name}${promptId}`;

			try {
				const r = await fetch(url);
				const json = await r.json();

				if (!json.ok) {
					errors.name = 'Name is not unique';
				}
			} catch (e) {
				toast.push('Something went wrong. Please try again.');
				console.log(e);
			}
		}
	}

	function getDisabled(errors, isTouched) {
		const anyError = Object.keys(errors).length > 0;
		const hasUntouched = _.every(isTouched, (v) => !v);

		if (['edit', 'fork'].includes(type)) {
			return anyError;
		}

		return anyError || hasUntouched;
	}

	function handleSubmit() {
		return async ({ result }) => {
			if (result.error) {
				console.log(`[FRONTEND ERROR] in ${formName}`, result.error);
				// TODO show some error toser
				onError(result.error);
				return;
			}

			// TODO show some success toser
			onSuccess(result.data);
		};
	}

	function handleFieldChange(event) {
		if (isTouched[event.target.name]) {
			return;
		}

		isTouched[event.target.name] = true;
		validateForm();
	}

	function handleAddNewModel(event) {
		if (event.target.value == '-1') {
			showAddNewModel = true;
		} else {
			showAddNewModel = false;
		}
	}

	function handleHeight(event) {
		const input = event.target;
		input.style.height = 'auto';
		input.style.height = `${input.scrollHeight}px`;
	}
</script>

<form
	name={formName}
	method="POST"
	{action}
	use:enhance={handleSubmit}
	on:input={validateForm}
	bind:this={_form}
>
	<div class="name field-wrap">
		<input
			name="name"
			type="text"
			autocomplete="off"
			placeholder={data.placeholder?.name}
			class:invalid={isTouched.name && errors.name}
			on:blur={handleFieldChange}
			on:input={handleFieldChange}
			value={_.get(data, 'prefill.name', '')}
			on:keypress={(e) => {
				if ($$slots.default && e.key === 'Enter') {
					e.preventDefault();
				}
			}}
		/>
		<span style="align-self: center;" class="error"
			>{isTouched.name && errors.name ? errors.name : ''}</span
		>
	</div>

	<div class="model">
		<select name="model" on:change={handleAddNewModel} on:focus={handleAddNewModel}>
			{#each data.allModels as model}
				<option selected={isSelected(model)} value={model.id}>{model.name}</option>
			{/each}
		</select>
	</div>

	<Tags />

	<div class="description field-wrap">
		<h2>Description</h2>
		<textarea
			name="description"
			rows="1"
			autocomplete="off"
			placeholder={data.placeholder?.description}
			class:invalid={isTouched.description && errors.description}
			on:blur={handleFieldChange}
			on:input={handleFieldChange}
			on:input={handleHeight}
			value={_.get(data, 'prefill.description', '')}
		/>
		<span class="error"
			>{isTouched.description && errors.description ? errors.description : ''}</span
		>
	</div>

	<div class="field-wrap content">
		<h2>Prompt</h2>
		<textarea
			name="content"
			rows="1"
			autocomplete="off"
			placeholder={data.placeholder?.content}
			class:invalid={isTouched.content && errors.content}
			on:blur={handleFieldChange}
			on:input={handleFieldChange}
			on:input={handleHeight}
			value={_.get(data, 'prefill.content', '')}
		/>
		<span class="error">{isTouched.content && errors.content ? errors.content : ''}</span>
	</div>

	<slot {disabled}>
		<div class="submit-wrap">
			<input class="bubble" type="submit" {disabled} />
		</div>
	</slot>
</form>

<style>
	form {
		margin-top: 42px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.field-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: var(--s-4);
		width: 100%;
		max-width: 750px;
	}

	.name {
		margin-bottom: var(--s-4);
	}

	.name input {
		font-size: var(--fs-5);
		font-weight: bold;
		text-align: center;
		border: none;
		border-bottom: 2px solid rgb(120, 120, 120);
	}

	.model {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: var(--s-5);
	}

	select[name='model'] {
		width: 146px;
		padding: var(--s-2);
		font-size: var(--fs-2);
		font-weight: bold;
		text-align: center;
		border: none;
		border-bottom: 2px solid rgb(120, 120, 120);
	}

	h2 {
		font-size: var(--fs-4);
		text-align: start;
		margin-bottom: var(--s-1);
		width: 100%;
	}

	.description {
		margin-top: var(--s-7);
	}

	.content {
		margin-top: var(--s-7);
	}

	input:focus,
	textarea:focus,
	select:focus {
		outline: none;
	}

	textarea {
		font-family: source-serif-pro, Georgia, Cambria, 'Times New Roman', Times, serif;
		border: none;
		border-bottom: 2px solid rgb(120, 120, 120);
		font-size: var(--fs-3);
		line-height: var(--s-6);
		width: 100%;
		resize: none;
		overflow-y: hidden;
	}

	.error {
		margin-top: var(--s-1);
		color: var(--danger);
		align-self: start;
	}

	.submit-wrap {
		display: flex;
		justify-content: end;
		width: 100%;
		max-width: 750px;
		margin-top: var(--s-7);
	}

	.submit-wrap input {
		background: var(--sucess);
		color: whitesmoke;
		border: none;
		font-size: var(--fs-2);
		cursor: pointer;
	}

	.submit-wrap input:hover {
		background: var(--sucess-hover);
	}

	.submit-wrap input:disabled {
		background: #b3b3b3;
		cursor: not-allowed;
	}

	.invalid {
		border-bottom: 4px solid var(--danger) !important;
		color: var(--danger);
	}

	input.invalid::placeholder, textarea.invalid::placeholder {
		color: var(--danger);
	}
</style>
