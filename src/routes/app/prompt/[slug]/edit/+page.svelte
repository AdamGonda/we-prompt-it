<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';
	import routes from '$lib/routes';
	import _ from 'lodash';

	let confirmEditDialog;
	let confirmDeleteDialog;
	let form;

	function onDelete() {
		return async () => {
			goto(`/app/my-collection`);
		};
	}

	function onEditSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

<PromptForm
	onSuccess={onEditSuccess}
	type="edit"
	bind:form
	let:disabled
	action={`?/edit`}
	formName="edit-prompt-form"
	data={{
		id: $page.data.prompt.id,
		prefill: {
			name: $page.data.prompt.name,
			description: $page.data.prompt.description,
			content: $page.data.prompt.content
		},
		selectedModelId: $page.data.prompt.aiModelId,
		allModels: $page.data.aiModels
	}}
>
	<a href={routes.prompt(true, $page.params.slug)}>
		<span>Content</span>
	</a>
	<button type="button" {disabled} on:click={() => confirmEditDialog.showModal()}
		>Submit</button
	>
</PromptForm>

<dialog bind:this={confirmEditDialog}>
	<button on:click={() => confirmEditDialog.close()}>Close</button>
	<h2>Are you sure you want to edit?</h2>
	<button on:click={form.requestSubmit()}>Submit</button>
</dialog>

<button
	on:click={() => {
		confirmDeleteDialog.showModal();
	}}>Delete</button
>
<dialog bind:this={confirmDeleteDialog}>
	<button on:click={() => confirmDeleteDialog.close()}>Close</button>
	<form method="POST" action="?/delete" use:enhance={onDelete}>
		Danger zone
		<input type="submit" value="Delete" />
	</form>
</dialog>

<style>
</style>
