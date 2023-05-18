<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
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

	function handleSubmit() {
		return async ({ result, update }) => {
			goto(`/repo/${result.data.id}`);
		};
	}
</script>

Fork
<form name="create-prompt-form" method="POST" use:enhance={handleSubmit}>
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
