<svelte:head>
    <title>Repo details | We Prompt</title> 
</svelte:head>

<script>
	import { page } from '$app/stores';

	const user = $page.data.session?.user;
	const isOwner = user ? $page.data.repo.author.email === user.email : false;
	let likes = $page.data.repo.likes.length
	$: forkLink = user ? `/app/prompt/${$page.params.slug}/fork` : `/login`;
	$: appreciationText = `Likes: ${likes}`

	async function handleAddRemoveLike() {
		const r = await fetch(`/api/add-remove-like?id=${$page.data.repo.id}`, {
			method: 'POST'
		});
		const json = await r.json();
		if (json.status == 200) {
			likes += json.diff;
		}
	}

	function copyToClipboard() {
		navigator.clipboard.writeText($page.data.repo.prompts[0].content);
	}
</script>

<div>
	<button>
		<a href={forkLink} >Create new based on this</a>
	</button>

	{#if user}
		<button on:click={handleAddRemoveLike}>
			{appreciationText}
		</button>
	{:else}
		<button>
			<a href={`/login`}>{appreciationText}</a>
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
	<button on:click={copyToClipboard}>Copy to clipboard</button>
	<slot />
</main>

<style>
</style>
