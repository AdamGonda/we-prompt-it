<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const data = {
		id: $page.data.repo.id,
		name: $page.data.repo.name,
		changeRequests: $page.data.repo.changeRequests,
		stars: $page.data.repo.stars.length,
		author: $page.data.repo.author
	};

	const user = $page.data.session?.user;

	async function handleAddRemoveStar() {
		const r = await fetch(`/api/add-remove-star?id=${data.id}`, {
			method: 'POST'
		})
		const json = await r.json()
		if(json.status == 200) {
			data.stars += json.diff
		}
	}
</script>

<div>
	<button>
		<a href={`/app/repo/${data.id}/fork`}>Create new based on this</a>
	</button>

	<button on:click={handleAddRemoveStar}>
		{`Stars: ${data.stars}`}
	</button>
</div>

<div class="location">
	<a href={`/profile/${$page.params.id}`}>
		<span>{data.author.firstName}</span>
	</a>
	/
	<a href={`/repo/${data.id}`}>
		<span>{data.name}</span>
	</a>
</div>

<ul>
	{#if user}
		<li>
			<a href={`/app/repo/${$page.params.id}`}>
				<span>Content</span>
			</a>
		</li>
		<li>
			<a href={`/app/repo/${$page.params.id}/edit`}>
				<span>Edit</span>
			</a>
		</li>
	{/if}
</ul>

<main>
	<slot />
</main>

<style>
	form[name='add-star'] input[type='submit'] {
		cursor: pointer;
	}
</style>
