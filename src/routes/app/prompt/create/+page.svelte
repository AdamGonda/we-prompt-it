<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

<div class="wrap">
	<PromptForm
		{onSuccess}
		action="?/create"
		formName="create-prompt-form"
		data={{
			placeholder: {
				name: 'Give it a name',
				description: 'Descripbe it in a few sentences',
				content: 'Here comes your magic prompt'
			},
			allModels: $page.data.allModels
		}}
	/>
</div>

<style>
	.wrap {
		display: grid;
		place-items: center;
		background: #E9E9E9;
		height: calc(100vh - 80px);
	}
</style>
