<script>
	import { browser } from "$app/environment";
	import { page } from "$app/stores";

	export let repo;
	let inApp = false

	if(browser && $page.data.session?.user) {
		inApp = true
	}

	console.log('log repo', repo)
</script>

<a href={`${inApp ? '/app' : ''}/repo/${repo.slug}`} data-testid="repo-card">
	<div>
		<p>id: <span>{repo.id}</span></p>
		<p>name: <span>{repo.name}</span></p>
		<p>stars: <span>{repo.stars?.length}</span></p>
		<p>forked: <span>{repo.noTimesForked}</span></p>
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
</style>
