<svelte:head>
    <title>Repo details | We Prompt</title> 
</svelte:head>

<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		changeRequests: $page.data.repo.changeRequests,
		stars: $page.data.repo.stars.length,
		author: $page.data.repo.author
	};

	const user = $page.data.session?.user;
	const isOwner = user ? $page.data.repo.author.email === user.email : false;
	const forkLink = user ? `/app/repo/${data.id}/fork` : `/login`;

	if (browser && user) {
		goto(`/app/repo/${data.id}`);
	}

	async function handleAddRemoveStar() {
		const r = await fetch(`/api/add-remove-star?id=${data.id}`, {
			method: 'POST'
		});
		const json = await r.json();
		if (json.status == 200) {
			data.stars += json.diff;
		}
	}
</script>

<div>
	<button>
		<a href={forkLink} data-testid="create-fork">Create new based on this</a>
	</button>

	{#if user}
		<button on:click={handleAddRemoveStar} data-testid="add-remove-star">
			{`Stars: ${data.stars}`}
		</button>
	{:else}
		<button>
			<a href={`/login`} data-testid="add-remove-star">Stars: {data.stars}</a>
		</button>
	{/if}
</div>

<div class="location">
	<a href={`/profile/${$page.params.id}`}>
		<span>{data.author.firstName}</span>
	</a>
	/
	<span>{data.name}</span>
</div>

<ul>
	{#if isOwner}
		<li>
			<a href={`/app/repo/${$page.params.id}`}>
				<span>Content</span>
			</a>
		</li>
		<li>
			<a href={`/app/repo/${$page.params.id}/edit`}>
				<span>Edit</span>
			</a>
		</li>
	{/if}
</ul>

<main>
	<slot />
</main>

<style>
</style>
