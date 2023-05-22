<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { formDataToObject, zodCheck } from '$lib/utils';
	import { forkSchema } from '$lib/zod-schemas';
	import _ from 'lodash';

	let form;
	let errors = {};
	let data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		description: $page.data.repo.description,
		content: $page.data.repo.prompts[0].content,
		models: $page.data.aiModels,
		slug: $page.data.repo.slug
	};

	function isSelected(model) {
		return model.id == $page.data.repo.prompts[0].aIModelId;
	}

	function handleSubmit() {
		return async ({ result, update }) => {
			if (result.error) {
				console.log('[FRONTEND ERROR] fork', result.error);
				// TODO show some error toser
				return;
			}

			// TODO show some success toser then navigate
			goto(`/app/prompt/${result.data.slug}`);
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
</script>

Fork
<form
	name="create-prompt-form"
	method="POST"
	use:enhance={handleSubmit}
	on:input={handleInput}
	bind:this={form}
>
	<input name="slug" type="hidden" value={data.slug} />

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
