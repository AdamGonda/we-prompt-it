<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';
	import _ from 'lodash';

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

Fork
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
			description: $page.data.repo.description,
			content: $page.data.repo.prompts[0].content
		},
		selectedModelId: $page.data.repo.prompts[0].aiModelId,
		allModels: $page.data.aiModels
	}}
/>
