<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		changeRequests: $page.data.repo.changeRequests,
		stars: $page.data.repo.stars,
		author: $page.data.repo.author
	};

	const user = $page.data.session?.user;

	if(browser && user) {
		goto(`/app/repo/${data.id}`)
	}	
</script>

<div>
	<button>
		<a href={`/signup`}>Create new based on this</a>
	</button>
	
	<button>
		<a href={`/signup`}>Stars: {data.stars?.length}</a>
	</button>
	
</div>

<div class="location">
	<a href={`/profile/${$page.params.id}`}>
		<span>{data.author.firstName}</span>
	</a>
	/
	<a href={`/repo/${data.id}`}>
		<span>{data.name}</span>
	</a>
</div>

<main>
	<slot />
</main>

<style>
	form[name='add-star'] input[type='submit'] {
		cursor: pointer;
	}
</style>
