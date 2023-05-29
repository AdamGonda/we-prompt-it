<script>
	import { page } from '$app/stores';
	import routes from '$lib/routes';

	const user = $page.data.session?.user;
	const isOwner = user ? $page.data.prompt.author.email === user.email : false;
	let likes = $page.data.prompt.likes.length;
	$: forkLink = routes.fork(user, $page.params.slug);
	$: appreciationText = `❤️ ${likes}`;
	console.log('log ', $page.data.prompt);

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

<svelte:head>
	<title>Prompt details | We Prompt</title>
</svelte:head>

<!--

<div>


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

-->

<main>
	<div class="header">
		<div class="top-bar">
			<a class="author" href={routes.profile($page.data.prompt.author.username)}>
				<img src={$page.data.prompt.author.picture} alt="" />
				<p>
					<span>created by</span>
					<br />
					{$page.data.prompt.author.username}
				</p>
			</a>

			<div style="display: flex; gap: 16px;">
				<span class="forked">
					<img src="/fork-icon.png" alt="fork-icon" />
					{$page.data.prompt.forkedCount}
				</span>

				<p>{appreciationText}</p>
			</div>
		</div>
		<h1>
			{$page.data.prompt.name}
		</h1>

		<div class="infos">
			<div>
				<p>{$page.data.prompt.aiModel.name}</p>
			</div>

			<button on:click={copyToClipboard}>
				<svg
					stroke="currentColor"
					fill="none"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4"
					height="1.2em"
					width="1.2em"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
					/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg
				>
				Copy prompt
			</button>
		</div>
	</div>

	<div style="display: flex; justify-content: center">
		<div class="body">
			<h2>Description</h2>
			<p class="description">
				{$page.data.prompt.description}
			</p>

			<h2>Prompt</h2>
			<p class="prompt">
				{$page.data.prompt.content}
			</p>
		</div>
	</div>
</main>

<style>
	main {
		padding: 0 64px;
	}

	h2 {
		margin: 0;
		margin-top: 32px;
		margin-bottom: 4px;
	}

	.description {
		font-size: 1.1rem;
	}

	.body {
		margin-top: 24px;
		max-width: 600px;
	}

	h1 {
		text-align: center;
		margin: 0;
		margin-bottom: 16px;
	}

	p {
		margin: 0;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.author img {
		border-radius: 50%;
		width: 44px;
	}

	.author {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.author span {
		font-size: 0.8em;
		font-weight: 300;
	}

	.infos {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 32px;
	}

	.forked img {
		width: 15px;
		margin-right: 5px;
	}

	.top-bar {
		display: flex;
		gap: 8px;
		justify-content: space-between;
		margin-top: 34px;
	}

	button {
		display: inline-block;
		padding: 8px 16px;
		background-color: #d9d9d9;
		color: black;
		text-decoration: none;
		font-size: 0.8rem;
		font-weight: 600;
		border-radius: 20px;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease;
		display: flex;
		gap: 8px;
		align-items: center;
	}

	button:hover {
		background-color: #b8b8b8;
	}

	button:active {
		background-color: #a0a0a0;
	}
</style>
