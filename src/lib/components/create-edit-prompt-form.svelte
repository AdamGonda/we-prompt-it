<script>
	import { page } from '$app/stores';
	export let type;

	let data = {
		action: 'createPrompt',
		title: 'some title goes here',
		description: 'some description goes here'
	};

	if (type == 'edit') {
		data = {
			action: 'editPrompt',
			title: $page.data.prompt.title,
			description: $page.data.prompt.description,
			aiModel: $page.data.prompt.content.aiModel.name
		};
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

	<label for="model">
		Model
		<select name="model">
			{#if type === 'edit'}
				<option value={data.aiModel}>{data.aiModel}</option>
			{:else}
				<!-- get values rest dynamicly from all possible ai models from db -->
        <option value="random model from db">random model 1 from db</option>
        <option value="random model from db">random model 2 from db</option>
			{/if}
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
