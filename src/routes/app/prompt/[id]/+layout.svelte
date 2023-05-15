<script>
	import { page } from '$app/stores';

	
	const data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		changeRequests: $page.data.repo.changeRequests,
		stars: $page.data.repo.stars,
		author: $page.data.repo.author,
	}
</script>


<div>
	<button>Create new based on this</button>
	<button>Stars: {data.stars?.length}</button>
</div>

<h1>
	<a href={`/app/profile/${data.author.id}`}>
		{data.author.firstName}
	</a>	
	/
	<a href={`/app/prompt/${data.id}`}>
		{data.name}
	</a>
</h1>

<ul>
	<li>
		<a href={`/app/prompt/${$page.params.id}`}>
			Prompt
		</a>
		<a href={`/app/prompt/${$page.params.id}/change-requests`}>
			Change requests - {data.changeRequests?.length}
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
