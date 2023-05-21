<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { formDataToObject, zodCheck } from '$lib/utils';
	import { editSchema } from '$lib/zod-schemas';
	import _ from 'lodash';

	let form;
	let errors = {};
	let data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		description: $page.data.repo.description,
		content: $page.data.repo.prompts[0].content,
		models: $page.data.aiModels
	};

	function isSelected(model) {
		return model.id == $page.data.repo.prompts[0].aiModelId;
	}

	function handleDelete() {
		return async () => {
			goto(`/app/my-collection`);
		};
	}

	function onInput() {
		errors = {};
		const formData = formDataToObject(new FormData(form));
		const parseResult = editSchema.safeParse(formData);

		zodCheck(parseResult, (_errors) => {
			errors = _.keyBy(_errors, 'field');

			for (let key in errors) {
				errors[key] = errors[key].message;
			}
		});
	}
</script>

<form
	name="edit-prompt-form"
	method="POST"
	action="?/edit"
	on:input={onInput}
	bind:this={form}
>
	<label for="name">
		Name
		<input name="name" type="text" value={data.name} />
		<span>{errors.name ? errors.name : ''}</span>
	</label>

	<label for="description">
		Description
		<textarea name="description" rows="4" cols="50" value={data.description} />
		<span>{errors.description ? errors.description : ''}</span>
	</label>

	<label for="content">
		Prompt
		<textarea name="content" rows="4" cols="50" value={data.content} />
		<span>{errors.content ? errors.content : ''}</span>
	</label>

	<label for="model">
		Model
		<select name="model">
			{#each data.models as model}
				<option selected={isSelected(model)} value={model.id}>{model.name}</option>
			{/each}
		</select>
	</label>

	<input type="submit" disabled={Object.keys(errors).length > 0} />
</form>

<form method="POST" action="?/delete" use:enhance={handleDelete}>
	Danger zone
	<input type="submit" value="Delete" />
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
