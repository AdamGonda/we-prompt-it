<script>
	import { page } from '$app/stores';

	const data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		changeRequests: $page.data.repo.changeRequests,
		stars: $page.data.repo.stars,
		author: $page.data.repo.author
	};
</script>

<div>
	<button>
		<a href={`/app/repo/${data.id}/fork`}>Create new based on this</a>
	</button>

	<form name="add-star" method="POST" action="?/addStar">
		<input type="submit" value={`Stars: ${data.stars?.length}`} />
	</form>
</div>

<div class="location">
	<a href={`/app/profile/${$page.params.id}`}>
		<span>{data.author.firstName}</span>
	</a>
	/
	<a href={`/app/repo/${data.id}`}>
		<span>{data.name}</span>
	</a>
</div>

<ul>
	<li>
		<a href={`/app/repo/${$page.params.id}`}>
			<span>Prompt</span>
		</a>
	</li>
	<li>
		<a href={`/app/repo/${$page.params.id}/change-requests`}>
			<span>Change requests - {data.changeRequests?.length}</span>
		</a>
	</li>
	<li>
		<a href={`/app/repo/${$page.params.id}/edit`}>
			<span>Edit</span>
		</a>
	</li>
</ul>

<main>
	<slot />
</main>

<style>
	form[name="add-star"] input[type="submit"] {
		cursor: pointer;
	}
</style>
