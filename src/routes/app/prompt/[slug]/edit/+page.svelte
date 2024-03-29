<script>
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoadingIndicator from '$lib/components/loading-indicator.svelte';
	import PromptForm from '$lib/components/prompt-form.svelte';
	import routes from '$lib/routes';
	import { toast } from '@zerodevx/svelte-toast';
	import _ from 'lodash';
	import { onMount } from 'svelte';

	let form;
	let isLoading;
	let confirmEditDialog;
	let confirmDiscardDialog;
	let confirmDeleteDialog;

	function onDelete() {
		isLoading = true;

		return async () => {
			goto(`/app/my-collection`);
			toast.push('Prompt deleted!');
		};
	}

	function onEditSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
		toast.push('Prompt updated!');
	}

	function handleBackdropClose(event) {
		if (event.target.close) {
			event.target.close();
		}
	}

	function handleDiscardChanges() {
		isLoading = true;
		goto(routes.prompt(true, $page.params.slug))
	}
</script>

<PromptForm
	onSuccess={onEditSuccess}
	type="edit"
	bind:form
	bind:isLoading
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
	<div class="slot">
		<div>
			<button
				class="bubble delete"
				type="button"
				on:click={() => {
					confirmDeleteDialog.showModal();
				}}>Delete</button
			>
		</div>

		<dir class="discard-apply">
			<button
				class="discard"
				type="button"
				on:click={() => confirmDiscardDialog.showModal()}
			>
				discard changes
			</button>
			<button
				class="bubble apply"
				type="button"
				{disabled}
				on:click={() => confirmEditDialog.showModal()}>Apply changes</button
			>
		</dir>
	</div>
</PromptForm>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={confirmEditDialog} on:click={handleBackdropClose}>
	<form method="POST" action="?/delete" use:enhance={onDelete}>
		<p>Are you sure you want to proceed?</p>
		<div class="dialog-confirm-wrap">
			<button
				class="dialog-confirm-cancel"
				type="button"
				on:click={() => confirmEditDialog.close()}>Cancel</button
			>
			<button
				class="bubble dialog-confirm-apply"
				type="button"
				on:click={() => form.requestSubmit()}
			>
				{#if isLoading}
					<LoadingIndicator height="20px" scale="0.4" color="var(--white)" />
				{:else}
					Apply changes
				{/if}
			</button>
		</div>
	</form>
</dialog>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={confirmDiscardDialog} on:click={handleBackdropClose}>
	<form method="POST" action="?/delete" use:enhance={onDelete}>
		<p>Are you sure you want to proceed?</p>
		<div class="dialog-confirm-wrap">
			<button
				class="dialog-confirm-cancel"
				type="button"
				on:click={() => confirmDiscardDialog.close()}>Cancel</button
			>
			<button
				class="bubble dialog-confirm-discard"
				type="button"
				on:click={handleDiscardChanges}
			>
				{#if isLoading}
					<LoadingIndicator height="20px" scale="0.4" color="var(--black)" />
				{:else}
					Discard changes
				{/if}
			</button>
		</div>
	</form>
</dialog>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={confirmDeleteDialog} on:click={handleBackdropClose}>
	<form method="POST" action="?/delete" use:enhance={onDelete}>
		<p>Are you sure you want to proceed?</p>
		<div class="dialog-confirm-wrap">
			<button
				class="dialog-confirm-cancel"
				type="button"
				on:click={() => confirmDeleteDialog.close()}>Cancel</button
			>
			<button class="bubble dialog-confirm-delete">
				{#if isLoading}
					<LoadingIndicator height="20px" scale="0.4" color="var(--white)" />
				{:else}
					Delete
				{/if}
			</button>
		</div>
	</form>
</dialog>

<style>
	dialog {
		background: white;
		border: none;
		border-radius: var(--br-1);
		padding: 0;
	}

	dialog[open] {
		animation: fadeIn 0.2s forwards;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}

	dialog form {
		font-size: var(--fs-4);
		display: flex;
		flex-direction: column;
		gap: var(--s-4);
		align-items: end;
		padding: var(--s-5);
	}

	dialog p {
		margin-top: 0;
	}

	dialog button,
	input {
		font-size: var(--fs-2);
		background: none;
		border: none;
		cursor: pointer;
	}

	.dialog-confirm-wrap {
		display: flex;
		gap: var(--s-4);
	}

	.dialog-confirm-cancel {
		margin: 0;
		padding: 0;
	}

	.dialog-confirm-delete {
		background: #e15759;
		color: white;
		font-weight: 400;
	}

	.dialog-confirm-delete:hover {
		background: rgb(211, 31, 31);
	}

	.slot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: var(--s-5);
		width: 100%;
		max-width: 750px;
	}

	.slot button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: var(--fs-2);
	}

	.discard-apply {
		display: flex;
		gap: var(--s-4);
	}

	.apply {
		background: var(--sucess) !important;
		color: whitesmoke;
	}

	.apply:hover {
		background: var(--sucess-hover) !important;
	}

	.apply:disabled {
		background: #b3b3b3 !important;
		cursor: not-allowed;
	}

	.dialog-confirm-apply {
		background: var(--sucess);
		color: whitesmoke;
	}

	.dialog-confirm-apply:hover {
		background: var(--sucess-hover);
	}

	.discard {
		font-size: var(--fs-1) !important;
		text-decoration: underline;
	}

	.dialog-confirm-discard {
		background: var(--alert);
		color: #333333;
	}

	.dialog-confirm-discard:hover {
		background: var(--alert-hover);
	}

	.delete {
		background: var(--danger) !important;
		color: white;
		border-radius: var(--br-2);
		padding: var(--s-3) var(--s-4);
	}

	.delete:hover {
		background: var(--danger-hover) !important;
	}
</style>
