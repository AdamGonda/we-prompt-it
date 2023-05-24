<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let repo;
	let inApp = false;
	console.log('log repo', repo)

	if (browser && $page.data.session?.user) {
		inApp = true;
	}
</script>

<a href={`${inApp ? '/app' : ''}/prompt/${repo.slug}`} data-testid="repo-card">
	<div>
		<span><b><u>{repo.name}</u></b></span>
		
		<main>
			<p>{repo.prompts[0].content}</p>
		</main>

		<sub>
			{#each repo.tags as tag}
				<span>{tag.name}</span>
			{/each}
		</sub>
		
		<footer class="footer">
			<span>{repo.prompts[0].aiModel.name}</span>
			<span>❤️ {repo.stars?.length}</span>
			<span><img src="/fork-icon.png" alt="fork-icon" /> {repo.noTimesForked}</span>
		</footer>
	</div>
</a>

<style>
	div {
		border: 1px solid black;
		border-radius: 7px;
		padding: 16px;
	}
	p {
		margin: 0;
	}

	span {
		font-size: 16px;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	a:focus {
		outline: none;
	}

	main {
		margin-top: 6px;
	}

	main p {
		line-height: 18px;
		font-size: 16px;
		font-weight: normal;
	}

	sub {
		display: flex;
		gap: 8px;
		margin-top: 6px;
	}

	sub span {
		border-radius: 10px;
		padding: 6px;
		border: 2px solid black;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 16px;
	}
</style>
