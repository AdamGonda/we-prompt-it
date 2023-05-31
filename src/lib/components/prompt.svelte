<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import routes from '$lib/routes';

	const user = $page.data.dbUser;
	const isOwner = user ? $page.data.prompt.author.email === user.email : false;
	let likes = $page.data.prompt.likes.length;
	let hartIconPrefix = getHartIconPrefix();
	$: forkLink = routes.fork(user, $page.params.slug);
	$: appreciationText = likes;
	let showCopyFeedback = false;

	function getHartIconPrefix() {
		if (user) {
			const liked = $page.data.prompt.likes.find((like) => like.userId === user.id);
			if (liked) {
				return 'fullhart';
			}
		}
		return 'hart';
	}

	function stringToColor(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let color = '#';
		for (let i = 0; i < 3; i++) {
			let value = (hash >> (i * 8)) & 0xaf; // change 0x7f to 0xaf
			color += ('00' + value.toString(16)).substr(-2);
		}
		return color;
	}

	async function handleAddRemoveLike() {
		if(!user) {
			goto('/login')
		}

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
				<button class="bubble" on:click={handleAddRemoveLike}>
					<img style="width: 16px" src={`/${hartIconPrefix}-icon.png`} alt="hart-icon" />
					{appreciationText}
				</button>

				<a href={forkLink}>
					<span class="forked bubble">
						<img src="/fork-icon.png" alt="fork-icon" />
						{$page.data.prompt.forkedCount}
					</span>
				</a>
			</div>
		</div>
		<div class="name">
			<h1>
				{$page.data.prompt.name}
			</h1>
			{#if isOwner}
				<a href={routes.edit($page.params.slug)}>Edit</a>
			{/if}
		</div>

		<div class="infos">
			<a class="model" target="_blank" href={$page.data.prompt.aiModel.link}>
				<p>{$page.data.prompt.aiModel.name}</p>
			</a>

			<button class="copy-btn bubble" on:click={copyToClipboard}>
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

		<div class="tags">
			{#each $page.data.prompt.tags as tag (tag.id)}
				<a
					class="bubble"
					style={`background-color: ${stringToColor(tag.name)}`}
					href={`/?tag=${tag.name}`}
				>
					#{tag.name}
				</a>
			{/each}
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
		gap: var(--s-4);
		align-items: center;
	}

	h1 {
		font-size: var(--fs-5);
	}

	h2 {
		margin: 0;
		margin-top: var(--s-7);
		margin-bottom: var(--s-1);
		font-size: var(--fs-4);
	}

	.model {
		text-decoration: underline;
	}

	.body {
		max-width: 800px; /* TODO */
	}

	.body p {
		font-family: source-serif-pro, Georgia, Cambria, 'Times New Roman', Times, serif;
		font-size: var(--fs-3);
		line-height: var(--s-6);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--fs-2);
		justify-content: center;
	}

	.tags a {
		font-size: var(--fs-1);
		color: white;
		font-weight: 500;
	}

	.name {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--s-5);
		margin-bottom: var(--s-4);
	}

	.name h1 {
		margin: 0;
		display: inline-block;
	}

	.name a {
		text-decoration: underline;
		margin-bottom: -5px;
		font-size: var(--fs-1);
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
		gap: var(--s-2);
	}

	.author span {
		font-size: 0.8em;
		font-weight: 300;
	}

	.infos {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--s-5);
		margin-bottom: var(--s-5);
	}

	.forked img {
		width: 15px;
		margin-right: 5px;
	}

	.forked {
		background: #e9e9e9;
	}

	.top-bar {
		display: flex;
		gap: var(--s-2);
		justify-content: space-between;
	}

	button {
		background: #e9e9e9;
		color: black;
		text-decoration: none;
		font-size: 16px;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease;
		display: flex;
		gap: var(--s-2);
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
