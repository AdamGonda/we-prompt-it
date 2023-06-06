<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';

	const myCollection = $page.data;
</script>

<svelte:head>
	<title>My collection | We Prompt</title>
</svelte:head>

<main>
	<h3>Created</h3>
	{#if myCollection.createdBy.length === 0}
		<div class="placeholder bubble">
			<p>
				It seems you haven't created any prompts yet! To do this, simply click on 
        <b>Create</b>
				in top right corner.
			</p>
		</div>
	{:else}
		<CardList prompts={myCollection.createdBy} />
	{/if}

	<h3 class="liked">Liked</h3>
	{#if myCollection.liked.length === 0}
		<div class="placeholder bubble">
			<p>
				No likes yet? No problem! Show some love to your favorite prompts by tapping the
				<span>
					<img src="/hart-icon.png" alt="hart" />
				</span>
				icon!
			</p>
		</div>
	{:else}
		<CardList prompts={myCollection.liked} />
	{/if}
</main>

<style>
	h3 {
		margin: 0;
		margin-bottom: var(--s-4);
	}

	.liked {
		margin-top: var(--s-6);
	}

	main {
		display: flex;
		flex-direction: column;
	}

	.placeholder img {
		width: 20px;
	}
</style>
