<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { formDataToObject, zodCheck } from '$lib/utils';
	import { forkSchema } from '$lib/zod-schemas';
	import _ from 'lodash';

	let form;
	let errors = {};
	let isTouched = {
		name: false,
		description: false,
		content: false
	};
	let data = {
		namePlaceholder: 'name placeholder todocopy',
		descriptionPlaceholder: 'description placeholder todocopy',
		contentPlaceholder: 'content placeholder todocopy',

		models: $page.data.aiModels
	};

	function handleSubmit() {
		return async ({ result, update }) => {
			if (result.error) {
				console.log('[FRONTEND ERROR] create', result.error);
				// TODO show some error toser
				return;
			}

			// TODO show some success toser then navigate
			goto(`/app/repo/${result.data.id}`);
		};
	}

	function handleInput() {
		errors = {};
		const formData = formDataToObject(new FormData(form));
		const parseResult = forkSchema.safeParse(formData);

		zodCheck(parseResult, (_errors) => {
			errors = _.keyBy(_errors, 'field');

			for (let key in errors) {
				errors[key] = errors[key].message;
			}
		});
	}

	function onInput(event) {
		isTouched[event.target.name] = true;
	}
</script>

Create
<form
	name="create-prompt-form"
	method="POST"
	use:enhance={handleSubmit}
	on:input={handleInput}
	bind:this={form}
>
	<label for="name">
		Name
		<input
			name="name"
			type="text"
			placeholder={data.namePlaceholder}
			on:input={onInput}
		/>
		<span>{isTouched.name && errors.name ? errors.name : ''}</span>
	</label>

	<label for="description">
		Description
		<textarea
			name="description"
			rows="4"
			cols="50"
			placeholder={data.descriptionPlaceholder}
			on:input={onInput}
		/>
		<span>{isTouched.description && errors.description ? errors.description : ''}</span>
	</label>

	<label for="content">
		Prompt
		<textarea
			name="content"
			rows="4"
			cols="50"
			placeholder={data.contentPlaceholder}
			on:input={onInput}
		/>
		<span>{isTouched.content && errors.content ? errors.content : ''}</span>
	</label>

	<label for="model">
		Model
		<select name="model">
			{#each data.models as model}
				<option value={model.id}>{model.name}</option>
			{/each}
		</select>
	</label>

	<input type="submit" disabled={Object.keys(errors).length > 0} />
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
