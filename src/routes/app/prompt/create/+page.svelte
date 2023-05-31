<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

<PromptForm
	{onSuccess}
	action="?/create"
	formName="create-prompt-form"
	data={{
		placeholder: {
			name: 'Give it a name',
			description: 'Describe your prompt in a few sentences',
			content: 'Here comes your magic prompt'
		},
		allModels: $page.data.allModels
	}}
/>
