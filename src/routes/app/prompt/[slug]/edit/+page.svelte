<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import RepoForm from '$lib/components/repo-form.svelte';
	import { formDataToObject, zodCheck } from '$lib/utils';
	import { editSchema } from '$lib/zod-schemas';
	import _ from 'lodash';

	function handleDelete() {
		return async () => {
			goto(`/app/my-collection`);
		};
	}
</script>

<RepoForm
	formName="edit-prompt-form"
	schema={editSchema}
	type="edit"
	action={`?/edit`}
	onSuccess={(data) => {
		goto(`/app/prompt/${data.slug}`);
	}}
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
