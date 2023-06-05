<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';
	import _ from 'lodash';

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

<PromptForm
	{onSuccess}
	type="fork"
	action="?/fork"
	formName="fork-prompt-form"
	data={{
		placeholder: {
			name: 'your uniuqe name todocopy'
		},
		prefill: {
			description: $page.data.prompt.description,
			content: $page.data.prompt.content
		},
		selectedModelId: $page.data.prompt.aiModelId,
		allModels: $page.data.aiModels
	}}
/>
