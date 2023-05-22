<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import RepoForm from '$lib/components/repo-form.svelte';

	function onSuccess(data) {
		goto(`/app/prompt/${data.slug}`);
	}
</script>

Create
<RepoForm
	{onSuccess}
	action="?/create"
	formName="create-prompt-form"
	data={{
		placeholder: {
			name: 'name placeholder todocopy',
			description: 'description placeholder todocopy',
			content: 'content placeholder todocopy'
		},
		allModels: $page.data.allModels
	}}
/>
