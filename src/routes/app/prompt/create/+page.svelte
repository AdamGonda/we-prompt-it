<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import RepoForm from '$lib/components/repo-form.svelte';
	import { createSchema } from '$lib/zod-schemas';

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

Create
<RepoForm
	data={{
		placeholder: {
			name: 'name placeholder todocopy',
			description: 'description placeholder todocopy',
			content: 'content placeholder todocopy'
		},
		allModels: $page.data.allModels
	}}
	action="?/create"
	formName="create-prompt-form"
	schema={createSchema}
	{onSuccess}
/>
