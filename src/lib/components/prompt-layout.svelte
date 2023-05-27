<svelte:head>
	<title>Prompt details | We Prompt</title>
</svelte:head>

<script>
	import { page } from '$app/stores';
	import routes from '$lib/routes';

	const user = $page.data.session?.user;
	const isOwner = user ? $page.data.prompt.author.email === user.email : false;
	let likes = $page.data.prompt.likes.length;
	$: forkLink = routes.fork(user, $page.params.slug);
	$: appreciationText = `Likes: ${likes}`;

	async function handleAddRemoveLike() {
		const r = await fetch(`/api/add-remove-like?id=${$page.data.prompt.id}`, {
			method: 'POST'
		});
		const json = await r.json();
		if (json.status == 200) {
			likes += json.diff;
		}
	}

	function copyToClipboard() {
		navigator.clipboard.writeText($page.data.prompt.content);
	}
</script>

<div>
	<button>
		<a href={forkLink}>Create new based on this</a>
	</button>

	{#if user}
		<button on:click={handleAddRemoveLike}>
			{appreciationText}
		</button>
	{:else}
		<button>
			<a href={routes.login}>{appreciationText}</a>
		</button>
	{/if}
</div>

<div class="location">
	<a href={routes.profile($page.data.prompt.author.username)}>
		<span>{$page.data.prompt.author.firstName}</span>
	</a>
	/
	<span>{$page.data.prompt.name}</span>
</div>

<ul>
	{#if isOwner}
		<li>
			<a href={routes.prompt(true, $page.params.slug)}>
				<span>Content</span>
			</a>
		</li>
		<li>
			<a href={routes.edit($page.params.slug)}>
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
