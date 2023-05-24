<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let repo;
	let inApp = false;

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
		
		<footer class="footer">
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

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 16px;
	}
</style>
