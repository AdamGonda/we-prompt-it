<script>
	import { page } from '$app/stores';

	
	const data = {
		title: $page.data.prompt.title,
		changeRequestsNo:$page.data.prompt.changeRequests.length,
		starts: $page.data.prompt,
		author: $page.data.prompt.author,
	}
</script>


<div>
	<button>Create noew based on this</button>
	<button>Stars: {data.changeRequestsNo}</button>
</div>

<h1>{data.author.firstName}/{data.title}</h1>

<ul>
	<li>
		<a href={`/app/prompt/${$page.params.id}`}>
			Prompt
		</a>
		<a href={`/app/prompt/${$page.params.id}/change-requests`}>
			Change requests - {data.changeRequestsNo}
		</a>
		<a href={`/app/prompt/${$page.params.id}/edit`}>
			Edit
		</a>
	</li>
</ul>

<main>
	<slot />
</main>

<style>
</style>
