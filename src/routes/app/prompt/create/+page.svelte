<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PromptForm from '$lib/components/prompt-form.svelte';

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

Create
<PromptForm
	{onSuccess}
	action="?/create"
	formName="create-prompt-form"
	data={{
		id: -1, // TODO fix it in check uniuqeness
		placeholder: {
			name: 'name placeholder todocopy',
			description: 'description placeholder todocopy',
			content: 'content placeholder todocopy'
		},
		allModels: $page.data.allModels
	}}
/>
