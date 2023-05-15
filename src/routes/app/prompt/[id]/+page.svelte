<script>
	import { page } from '$app/stores';

	const data = {
		title: $page.data.prompt.title,
		description: $page.data.prompt.description,
		content: $page.data.prompt.content.content,
	}
</script>

<h1>{data.title}</h1>
<h1>{data.description}</h1>
<h1>{data.content}</h1>

<style>
</style>
