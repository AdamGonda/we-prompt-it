<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import _ from 'lodash';

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
		toast.push('Prompt created! 🎉');
	}
</script>

<svelte:head>
	<title>Fork | We Prompt</title>
</svelte:head>

<PromptForm
	{onSuccess}
	type="fork"
	action="?/fork"
	formName="fork-prompt-form"
	data={{
		placeholder: {
			name: 'Give it a name',
			description: 'Describe your prompt in a few sentences',
			content: 'Here comes your magic prompt'
		},
		prefill: {
			description: $page.data.prompt.description,
			content: $page.data.prompt.content
		},
		selectedModelId: $page.data.prompt.aiModelId,
		allModels: $page.data.aiModels
	}}
/>
