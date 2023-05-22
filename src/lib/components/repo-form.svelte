<script>
	import { enhance } from '$app/forms';
	import { formDataToObject, zodCheck } from '$lib/utils';
	import { repoSchema } from '$lib/zod-schemas';
	import _ from 'lodash';
	import { onMount } from 'svelte';

	export let onSuccess = (data) => {};
	export let onError = (error) => {};
	export let formName;
	export let data;
	export let action;
	export let type = 'create';

	let form;
	let errors = {};
	let isTouched = {
		name: false,
		description: false,
		content: false
	};

	onMount(() => {
		if (type === 'fork') {
			checkRepoNameUniqueness(formDataToObject(new FormData(form)));
		}
	});

	function isSelected(model) {
		return model.id == data.selectedModelId;
	}

	function handleSubmit() {
		return async ({ result }) => {
			if (result.error) {
				console.log(`[FRONTEND ERROR] in ${formName} form`, result.error);
				// TODO show some error toser
				onError(result.error);
				return;
			}

			// TODO show some success toser then navigate
			onSuccess(result.data);
		};
	}

	async function validateForm() {
		errors = {};
		const formData = formDataToObject(new FormData(form));
		const parseResult = repoSchema.safeParse(formData);

		zodCheck(parseResult, (_errors) => {
			errors = _.keyBy(_errors, 'field');

			for (let key in errors) {
				errors[key] = errors[key].message;
			}
		});

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

	function handleTouched(event) {
		if (isTouched[event.target.name]) {
			return;
		}

		isTouched[event.target.name] = true;
		validateForm();
	}

	function getDisabled(errors, isTouched) {
		const anyError = Object.keys(errors).length > 0;
		const hasUntouched = _.every(isTouched, (v) => !v);

		if (['edit', 'fork'].includes(type)) {
			return anyError;
		}

		return anyError || hasUntouched;
	}

	$: disabled = getDisabled(errors, isTouched);
</script>

<form
	name={formName}
	method="POST"
	{action}
	use:enhance={handleSubmit}
	on:input={validateForm}
	bind:this={form}
>
	<label for="name">
		Name
		<input
			name="name"
			type="text"
			placeholder={data.placeholder?.name}
			on:blur={handleTouched}
			on:input={handleTouched}
			value={_.get(data, 'prefill.name', '')}
		/>
		<span>{isTouched.name && errors.name ? errors.name : ''}</span>
	</label>

	<label for="description">
		Description
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
		Prompt
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
		<select name="model">
			{#each data.allModels as model}
				<option selected={isSelected(model)} value={model.id}>{model.name}</option>
			{/each}
		</select>
	</label>

	<input type="submit" {disabled} />
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
