<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';
	import _ from 'lodash';

	function handleDelete() {
		return async () => {
			goto(`/app/my-collection`);
		};
	}

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

<PromptForm
	{onSuccess}
	type="edit"
	action={`?/edit`}
	formName="edit-prompt-form"
	data={{
		prefill: {
			name: $page.data.repo.name,
			description: $page.data.repo.description,
			content: $page.data.repo.prompts[0].content
		},
		selectedModelId: $page.data.repo.prompts[0].aiModelId,
		allModels: $page.data.aiModels
	}}
/>

<form method="POST" action="?/delete" use:enhance={handleDelete}>
	Danger zone
	<input type="submit" value="Delete" />
</form>

<style>
</style>
