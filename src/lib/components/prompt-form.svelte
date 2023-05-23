<script>
	import { enhance } from '$app/forms';
	import { formDataToObject, zodCheck } from '$lib/utils';
	import { repoSchema } from '$lib/yup-schemas';
	import _ from 'lodash';
	import { onMount } from 'svelte';

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
		content: false
	};

	$: disabled = getDisabled(errors, isTouched);
	$: form = _form;

	onMount(() => {
		if (type === 'fork') {
			validateForm();
		}
	});

	function isSelected(model) {
		return model.id == data.selectedModelId;
	}

	async function validateForm() {
		errors = {};
		const formData = formDataToObject(new FormData(_form));
		try {
			repoSchema.validateSync(formData, { abortEarly: false });
		} catch (error) {
			error.inner.forEach((err) => {
				errors[err.path] = err.errors[0];
			});
		}

		console.log('log errors', errors);

		checkRepoNameUniqueness(formData);
	}

	async function checkRepoNameUniqueness(formData) {
		if (type !== 'edit' && formData.name) {
			const r = await fetch(
				`/api/check-repo-name-uniqueness?proposedName=${formData.name}`
			);
			const json = await r.json();

			if (!json.isUnique) {
				errors.name = 'Name is not unique';
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
				console.log(`[FRONTEND ERROR] in ${formName} form`, result.error);
				// TODO show some error toser
				onError(result.error);
				return;
			}

			// TODO show some success toser
			onSuccess(result.data);
		};
	}

	function handleTouched(event) {
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
</script>

<form
	name={formName}
	method="POST"
	{action}
	use:enhance={handleSubmit}
	on:input={validateForm}
	bind:this={_form}
>
	<label for="name">
		Name {['create', 'fork'].includes(type) ? '*' : ''}
		<input
			name="name"
			type="text"
			placeholder={data.placeholder?.name}
			on:blur={handleTouched}
			on:input={handleTouched}
			value={_.get(data, 'prefill.name', '')}
			on:keypress={(e) => {
				if ($$slots.default && e.key === 'Enter') {
					e.preventDefault();
				}
			}}
		/>
		<span>{isTouched.name && errors.name ? errors.name : ''}</span>
	</label>

	<label for="description">
		Description {type == 'create' ? '*' : ''}
		<textarea
			name="description"
			rows="4"
			cols="50"
			placeholder={data.placeholder?.description}
			on:blur={handleTouched}
			on:input={handleTouched}
			value={_.get(data, 'prefill.description', '')}
		/>
		<span>{isTouched.description && errors.description ? errors.description : ''}</span>
	</label>

	<label for="content">
		Prompt {type == 'create' ? '*' : ''}
		<textarea
			name="content"
			rows="4"
			cols="50"
			placeholder={data.placeholder?.content}
			on:blur={handleTouched}
			on:input={handleTouched}
			value={_.get(data, 'prefill.content', '')}
		/>
		<span>{isTouched.content && errors.content ? errors.content : ''}</span>
	</label>

	<label for="model">
		Model
		<select name="model" on:change={handleAddNewModel} on:focus={handleAddNewModel}>
			{#each data.allModels as model}
				<option selected={isSelected(model)} value={model.id}>{model.name}</option>
			{/each}
			<option value="-1">Add new model</option>
		</select>
	</label>

	{#if showAddNewModel}
		<div>
			<label for="new-model-name">
				<input type="text" name="new-model-name" placeholder="Name" />
			</label>
			<label for="new-model-link">
				<input type="text" name="new-model-link" placeholder="Link" />
			</label>
		</div>
	{/if}

	<slot {disabled}>
		<input type="submit" {disabled} />
	</slot>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 8px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	span {
		font-size: 1rem;
		color: red;
	}
</style>
