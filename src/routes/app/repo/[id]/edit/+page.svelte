<script>
	import { page } from '$app/stores';

	let data = {
		name: $page.data.repo.name,
		description: $page.data.repo.description,
		content: $page.data.repo.prompt.content,
		models: $page.data.aiModels
	};

	function isSelected(model) {
		return model.id == $page.data.repo.prompt.aiModel.id;
	}
</script>

<form name="create-prompt-form" method="POST" action="?/edit">
	<label for="name">
		Name
		<input name="name" type="text" value={data.name} />
	</label>

	<label for="description">
		Description
		<textarea
			name="description"
			rows="4"
			cols="50"
			value={data.description}
		/>
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

<form method="POST" action="?/delete">
	Danger zone
	<input type="submit" value="Delete">
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
