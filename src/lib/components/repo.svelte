<script>
	export let repo;
</script>

<a href={`/app/repo/${repo.id}`}>
	<div>
		Prompt {repo.name}
	</div>
</a>
