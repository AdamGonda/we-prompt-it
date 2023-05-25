<script>
	import { page } from '$app/stores';

	const data = {
		name: $page.data.prompt.name,
		description: $page.data.prompt.description,
		content: $page.data.prompt.prompts[0].content,
	}
</script>

<main>
	<div>
		<h2>{data.content}</h2>
	</div>
	<div>
		<h2>About</h2>
		<p>{data.description}</p>
	</div>
</main>

<style>
main {
	display: flex;
}
</style>
