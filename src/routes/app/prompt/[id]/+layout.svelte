<script>
	import { page } from '$app/stores';

	const changeRequestsNo = $page.data.prompt.changeRequests.length
</script>

<ul>
	<li>
		<a href={`/app/prompt/${$page.params.id}`}>
			Prompt
		</a>
		<a href={`/app/change-request/list`}>
			Change requests - {changeRequestsNo}
		</a>
		<a href={`/app/prompt/${$page.params.id}/edit`}>
			Edit
		</a>
	</li>
</ul>
<main>
	<slot />
</main>

<style>
</style>
