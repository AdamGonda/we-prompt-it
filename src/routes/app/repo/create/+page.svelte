<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let data = {
		namePlaceholder: 'name placeholder todocopy',
		descriptionPlaceholder: 'description placeholder todocopy',
		contentPlaceholder: 'content placeholder todocopy',
		
		models: $page.data.aiModels
	};
</script>

Create
<form name="create-prompt-form" method="POST" use:enhance>
	<label for="name">
		Name
		<input name="name" type="text" placeholder={data.namePlaceholder} />
	</label>

	<label for="description">
		Description
		<textarea
			name="description"
			rows="4"
			cols="50"
			placeholder={data.descriptionPlaceholder}
		/>
	</label>

	<label for="content">
		Prompt
		<textarea name="content" rows="4" cols="50" placeholder={data.contentPlaceholder} />
	</label>

	<label for="model">
		Model
		<select name="model">
			{#each data.models as model}
				<option value={model.id}>{model.name}</option>
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
