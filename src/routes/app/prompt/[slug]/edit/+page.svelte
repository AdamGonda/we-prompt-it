<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';
	import routes from '$lib/routes';
	import _ from 'lodash';
	import { onMount } from 'svelte';

	let confirmEditDialog;
	let confirmDiscardDialog;
	let confirmDeleteDialog;
	let form;

	onMount(() => {
		// confirmEditDialog.showModal();
		// confirmDiscardDialog.showModal();
		confirmDeleteDialog.showModal();
	});

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
		placeholder: {
			name: 'Give it a name',
			description: 'Describe your prompt in a few sentences',
			content: 'Here comes your magic prompt'
		},
		selectedModelId: $page.data.prompt.aiModelId,
		allModels: $page.data.aiModels
	}}
>
	<button type="button" on:click={() => confirmDiscardDialog.showModal()}>
		discard changes
	</button>
	<button type="button" {disabled} on:click={() => confirmEditDialog.showModal()}
		>Submit</button
	>
</PromptForm>

<div class="danger-zone">
	<p>Danger zone</p>
	<button
		on:click={() => {
			confirmDeleteDialog.showModal();
		}}>Delete</button
	>
</div>

<dialog class="confirm-edit" bind:this={confirmEditDialog}>
	<button on:click={() => confirmEditDialog.close()}>Close</button>
	<h2>Are you sure you want to edit?</h2>
	<button on:click={form.requestSubmit()}>Submit</button>
</dialog>

<dialog class="confirm-discard" bind:this={confirmDiscardDialog}>
	<button on:click={() => confirmDiscardDialog.close()}>Close</button>
	<h2>Are you sure you want to discard?</h2>
	<button on:click={() => goto(routes.prompt(true, $page.params.slug))}>Submit</button>
</dialog>

<dialog class="confirm-delete" bind:this={confirmDeleteDialog}>
	<form method="POST" action="?/delete" use:enhance={onDelete}>
		<p>Are you sure you want to proceed?</p>
		<div>
			<button type="button" on:click={() => confirmDeleteDialog.close()}>Cancel</button>
			<input class="bubble" type="submit" value="Delete" />
		</div>
	</form>
</dialog>

<style>
	.danger-zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: var(--s-5);
	}

	.danger-zone p {
		border: 4px dashed red;
		padding: var(--s-2) var(--s-4);
		font-weight: 500;
	}

	dialog {
		background: white;
		border: none;
		border-radius: var(--br-1);
		padding: var(--s-6);
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.confirm-delete form {
		font-size: var(--fs-4);
		display: flex;
		flex-direction: column;
		gap: var(--s-4);
		align-items: center;
	}

	.confirm-delete p {
		margin-top: 0;
	}

	.confirm-delete button,
	input {
		font-size: var(--fs-2);
		background: none;
		border: none;
		cursor: pointer;
	}

	.confirm-delete input {
		background: rgb(255, 38, 38);
		color: white;
		font-weight: bold;
		margin-left: var(--s-4);
	}

	.confirm-delete input:hover {
		background: rgb(211, 31, 31);
	}
</style>
