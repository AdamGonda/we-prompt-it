<script>
	import { page } from '$app/stores';

	const data = {
		title: $page.data.prompt.title,
		description: $page.data.prompt.description,
		content: $page.data.prompt.content.content,
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
