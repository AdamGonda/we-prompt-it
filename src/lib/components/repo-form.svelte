<script>
	import { enhance } from '$app/forms';
	import { formDataToObject, zodCheck } from '$lib/utils';
	import _ from 'lodash';

  export let onSuccess = (data) => {};
  export let onError = (error) => {};
	export let formName;
	export let schema;
	export let data;

	let form;
	let errors = {};
	let isTouched = {
    name: false,
    description: false,
    content: false,
  }

	function isSelected(model) {
		return model.id == data.selectedModelId;
	}

	function handleSubmit() {
		return async ({ result }) => {
			if (result.error) {
				console.log(`[FRONTEND ERROR] in ${formName} form`, result.error);
				// TODO show some error toser
        onError(result.error)
				return;
			}

			// TODO show some success toser then navigate
			onSuccess(result.data)
		};
	}

	async function validateForm() {
		errors = {};
		const formData = formDataToObject(new FormData(form));
		const parseResult = schema.safeParse(formData);

		zodCheck(parseResult, (_errors) => {
			errors = _.keyBy(_errors, 'field');

			for (let key in errors) {
				errors[key] = errors[key].message;
			}
		});

		if (formData.name) {
			const r = await fetch(
				`/api/check-repo-name-uniqueness?proposedName=${formData.name}`
			);
			const json = await r.json();

			if (!json.isUnique) {
				errors.name = 'Name is not unique';
			}
		}

    console.log('log isTouched', isTouched)
	}

	function handleTouched(event) {
		if (isTouched[event.target.name]) {
			return;
		}

		isTouched[event.target.name] = true;
		validateForm();
	}
</script>

<form
	name={formName}
	method="POST"
	use:enhance={handleSubmit}
	on:input={validateForm}
	bind:this={form}
>
	<label for="name">
		Name
		<input
			name="name"
			type="text"
			placeholder={data.placeholder.name}
			on:blur={handleTouched}
			on:input={handleTouched}
		/>
		<span>{isTouched.name && errors.name ? errors.name : ''}</span>
	</label>

	<label for="description">
		Description
		<textarea
			name="description"
			rows="4"
			cols="50"
			placeholder={data.placeholder.description}
			on:blur={handleTouched}
			on:input={handleTouched}
		/>
		<span>{isTouched.description && errors.description ? errors.description : ''}</span>
	</label>

	<label for="content">
		Prompt
		<textarea
			name="content"
			rows="4"
			cols="50"
			placeholder={data.placeholder.content}
			on:blur={handleTouched}
			on:input={handleTouched}
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

	<input
		type="submit"
		disabled={Object.keys(errors).length > 0 || _.some(isTouched, (v) => !v)}
	/>
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
