<script>
	import { page } from '$app/stores';
	import routes from '$lib/routes';
	import { set } from 'lodash';

	const user = $page.data.session?.user;
	const isOwner = user ? $page.data.prompt.author.email === user.email : false;
	let likes = $page.data.prompt.likes.length;
	let hartIconPrefix = $page.data.prompt.likes
		.map((like) => like.userId)
		.includes($page.data.user.id)
		? 'fullhart'
		: 'hart';
	$: forkLink = routes.fork(user, $page.params.slug);
	$: appreciationText = likes;
	let showCopyFeedback = false;

	async function handleAddRemoveLike() {
		const r = await fetch(`/api/add-remove-like?id=${$page.data.prompt.id}`, {
			method: 'POST'
		});
		const json = await r.json();
		if (json.status == 200) {
			likes += json.diff;

			if (hartIconPrefix == 'hart') {
				hartIconPrefix = 'fullhart';
			} else {
				hartIconPrefix = 'hart';
			}
		}
	}

	function copyToClipboard() {
		navigator.clipboard.writeText($page.data.prompt.content);
		showCopyFeedback = true;
		
		setTimeout(() => {
			showCopyFeedback = false;
		}, 2000);
	}
</script>

<svelte:head>
	<title>Prompt details | We Prompt</title>
</svelte:head>

<!--
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

			<div class="actions">
				<a href={forkLink}>
					<span class="forked">
						<img src="/fork-icon.png" alt="fork-icon" />
						{$page.data.prompt.forkedCount}
					</span>
				</a>

				<button on:click={handleAddRemoveLike}>
					<img style="width: 16px" src={`/${hartIconPrefix}-icon.png`} alt="hart-icon" />
					{appreciationText}
				</button>
			</div>
		</div>
		<h1>
			{$page.data.prompt.name}
		</h1>

		<div class="infos">
			<p class="model">{$page.data.prompt.aiModel.name}</p>

			<button on:click={copyToClipboard}>
				{#if showCopyFeedback}
					<img width="10px" src="/tick.png" alt="tick-icon" />
					Copied!
				{:else}
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
				{/if}
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
	.actions {
		display: flex;
		gap: 16px;
		align-items: center;
	}

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
		max-width: 800px;
	}

	.body p {
		font-family: source-serif-pro, Georgia, Cambria, 'Times New Roman', Times, serif;
		font-size: 1.2rem;
		line-height: 32px;
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

	.forked {
		background: #e9e9e9;
		padding: 10px 16px;
		border-radius: 24px;
	}

	.top-bar {
		display: flex;
		gap: 8px;
		justify-content: space-between;
		margin-top: 34px;
	}

	button {
		display: inline-block;
		padding: 10px 16px;
		background: #e9e9e9;
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

	button:hover,
	.forked:hover {
		background-color: #cdcdcd;
	}

	button:active {
		background-color: #a0a0a0;
	}
</style>
