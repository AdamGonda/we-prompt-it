<script>
	import { page } from '$app/stores';
	import { each } from 'svelte/internal';
	export let type;

	console.log('log $page.data', $page.data);

	let data = {
		action: 'createPrompt',
		title: 'some title goes here todocopy',
		description: 'some description goes here todocopy',
		content: 'some prompt contnet todocopy',
		models: $page.data.aiModels
	};

	if (type == 'edit') {
		data.action = 'editPrompt';
		data.title = $page.data.prompt.title;
		data.description = $page.data.prompt.description;
		data.content = $page.data.prompt.content.content;
	}

	function isSelected(model) {
		return type == 'edit' && model.id == $page.data.prompt.content.aiModel.id
	}
</script>

<form name="create-prompt-form" method="POST" action={`?/${data.action}`}>
	<label for="title">
		Title
		<input name="title" type="text" placeholder={data.title} />
	</label>

	<label for="description">
		Description
		<textarea name="description" rows="4" cols="50" placeholder={data.description} />
	</label>

	<label for="content">
		Prompt
		<textarea name="content" rows="4" cols="50" placeholder={data.content} />
	</label>

	<label for="model">
		Model
		<select name="model">
				{#each data.models as model}
					<option selected={isSelected(model)} value={model.id}>{model.name}</option>
				{/each}
		</select>
	</label>

	<input type="submit" />
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
</style>
