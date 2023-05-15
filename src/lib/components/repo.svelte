<script>
	export let repo;
</script>

<a href={`/app/repo/${repo.id}`}>
	<div>
		<p>id: <span>{repo.id}</span></p>
		<p>name: <span>{repo.name}</span></p>
		<p>stars: <span>{repo.stars?.length}</span></p>
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
