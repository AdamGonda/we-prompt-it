<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import RepoForm from '$lib/components/repo-form.svelte';
	import { forkSchema } from '$lib/zod-schemas';
	import _ from 'lodash';
	
</script>

Fork
<RepoForm 
	formName="fork-prompt-form"
	action="?/fork"
	schema={forkSchema}
	type="fork"
	onSuccess={(data) => {
		goto(`/app/prompt/${data.slug}`);
	}}
	data={{
		prefill: {
			name: $page.data.repo.name,
			description: $page.data.repo.description,
			content: $page.data.repo.prompts[0].content,
		},
		selectedModelId: $page.data.repo.prompts[0].aiModelId,
		allModels: $page.data.aiModels
	}}
/>
