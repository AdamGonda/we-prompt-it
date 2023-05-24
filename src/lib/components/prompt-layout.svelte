<svelte:head>
    <title>Repo details | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';

	const user = $page.data.session?.user;
	const isOwner = user ? $page.data.repo.author.email === user.email : false;
	$: forkLink = user ? `/app/prompt/${$page.params.slug}/fork` : `/login`;
	let stars = $page.data.repo.stars.length

	async function handleAddRemoveStar() {
		const r = await fetch(`/api/add-remove-star?id=${$page.data.repo.id}`, {
			method: 'POST'
		});
		const json = await r.json();
		if (json.status == 200) {
			stars += json.diff;
		}
	}
</script>

<div>
	<button>
		<a href={forkLink} data-testid="create-fork">Create new based on this</a>
	</button>

	{#if user}
		<button on:click={handleAddRemoveStar} data-testid="add-remove-star">
			{`Stars: ${stars}`}
		</button>
	{:else}
		<button>
			<a href={`/login`} data-testid="add-remove-star">Stars: {stars}</a>
		</button>
	{/if}
</div>

<div class="location">
	<a href={`/profile/${$page.data.repo.author.username}`}>
		<span>{$page.data.repo.author.firstName}</span>
	</a>
	/
	<span>{$page.data.repo.name}</span>
</div>

<ul>
	{#if isOwner}
		<li>
			<a href={`/app/prompt/${$page.params.slug}`}>
				<span>Content</span>
			</a>
		</li>
		<li>
			<a href={`/app/prompt/${$page.params.slug}/edit`}>
				<span>Edit</span>
			</a>
		</li>
	{/if}
</ul>

<main>
	<button>Copy to clipboard</button>
	<slot />
</main>

<style>
</style>
