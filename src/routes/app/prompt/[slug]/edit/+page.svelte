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

	let confirmEditDialog;;
	let confirmDeleteDialog;
	let form;
</script>

<PromptForm
	{onSuccess}
	type="edit"
	bind:form={form}
	let:disabled
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
>
	<button type="button" disabled={disabled} on:click={() => (confirmEditDialog.showModal())}>Submit</button>
</PromptForm>

<dialog bind:this={confirmEditDialog}>
	<button on:click={() => confirmEditDialog.close()}>Close</button>
	<h2>Are you sure you want to edit?</h2>
	<button on:click={form.requestSubmit()}>Submit</button>
</dialog>

<button on:click={() => {confirmDeleteDialog.showModal()}}>Delete</button>
<dialog bind:this={confirmDeleteDialog}>
	<button on:click={() => confirmDeleteDialog.close()}>Close</button>
	<form method="POST" action="?/delete" use:enhance={handleDelete}>
		Danger zone
		<input type="submit" value="Delete" />
	</form>
</dialog>

<style>
</style>
