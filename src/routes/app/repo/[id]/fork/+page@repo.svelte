<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	

	let data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		description: $page.data.repo.description,
		content: $page.data.repo.prompts[0].content,
		models: $page.data.aiModels
	};

	console.log('log data', data)

	function isSelected(model) {
		return model.id == $page.data.repo.prompts[0].aIModelId;
	}

	function handleSubmit() {
		return async ({ result, update }) => {
			goto(`/app/repo/${result.data.id}`);
		};
	}
</script>

Fork
<form name="create-prompt-form" method="POST" use:enhance={handleSubmit}>
	<input name="id" type="hidden" value={data.id} />

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
