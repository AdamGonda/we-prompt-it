<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		description: $page.data.repo.description,
		content: $page.data.repo.prompt.content,
		models: $page.data.aiModels
	};

	function isSelected(model) {
		return model.id == $page.data.repo.prompt.aiModel.id;
	}

	function handleEdit() {
		return async () => {
			console.log('log navigate');
			goto(`/app/repo/${data.id}`);
		};
	}

	function handleDelete() {
		return async () => {
			console.log('log navigate');
			goto(`/app/my-collection`);
		};
	}
</script>

<form name="edit-prompt-form" method="POST" action="?/edit" use:enhance={handleEdit}>
	<label for="name">
		Name
		<input name="name" type="text" value={data.name} />
	</label>

	<label for="description">
		Description
		<textarea name="description" rows="4" cols="50" value={data.description} />
	</label>

	<label for="content">
		Prompt
		<textarea name="content" rows="4" cols="50" value={data.content} />
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
</style>
