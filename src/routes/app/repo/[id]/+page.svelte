<script>
	import { page } from '$app/stores';

	const data = {
		name: $page.data.repo.name,
		description: $page.data.repo.description,
		content: $page.data.repo.prompt.content,
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
