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
				name: 'name placeholder todocopy',
				description: 'description placeholder todocopy',
				content: 'content placeholder todocopy'
			},
			allModels: $page.data.allModels
		}}
	/>
</div>

<style>
	.wrap {
		background: #E9E9E9;
		height: 100vh;
	}
</style>
