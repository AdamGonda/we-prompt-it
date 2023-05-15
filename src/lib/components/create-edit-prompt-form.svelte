<script>
	import { page } from '$app/stores';
	export let type;
	const isEdit = type === 'edit';

	let data = {
		action: 'createRepo',
		title: 'some title goes here todocopy',
		titlePlaceholder: 'title placeholder todocopy',
		description: 'some description goes here todocopy',
		descriptionPlaceholder: 'description placeholder todocopy',
		content: 'some prompt contnet todocopy',
		contentPlaceholder: 'content placeholder todocopy',
		models: $page.data.aiModels,
	};

	if (isEdit) {
		data.action = 'editRepo';
		data.name = $page.data.repo.name;
		data.description = $page.data.repo.description;
		data.content = $page.data.repo.prompt.content;
	}

	function isSelected(model) {
		return type == 'edit' && model.id == $page.data.repo.prompt.aiModel.id;
	}
</script>

<form name="create-prompt-form" method="POST" action={`?/${data.action}`}>
	<label for="name">
		Name
		<input
			name="name"
			type="text"
			value={isEdit ? data.name : ''}
			placeholder={isEdit ? '' : data.titlePlaceholder}
		/>
	</label>

	<label for="description">
		Description
		<textarea name="description" rows="4" cols="50" value={isEdit ? data.description : ''}
		placeholder={isEdit ? '' : data.descriptionPlaceholder} />
	</label>

	<label for="content">
		Prompt
		<textarea name="content" rows="4" cols="50" value={isEdit ? data.content : ''}
		placeholder={isEdit ? '' : data.contentPlaceholder} />
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
