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
		<div class="placeholder-wrap">
			<div class="placeholder bubble">
				<p>
					It appears you haven't created any prompts yet! To start crafting your own,
					simply click on the
					<b>Create</b>
					button in the top right, to craft something from scratch.
				</p>
			</div>
			<div class="placeholder bubble">
				<p>
					Alternatively, if you've found a prompt that inspires you, make it your own! All you need to do is navigate to its page and look for the 
					<span>
						<img src="/fork-icon.png" alt="plus" style="margin-right: -2px" />
					</span>
					button. 
				</p>
			</div>
			
		</div>
	{:else}
		<CardList prompts={myCollection.createdBy} />
	{/if}

	<h3 class="liked">Liked</h3>
	{#if myCollection.liked.length === 0}
		<div class="placeholder bubble">
			<p>
				Looks like you haven't liked any prompts yet! To add to your favorites, tap the
				<span>
					<img src="/fathart-icon.svg" alt="hart" />
				</span>
				button located on the top right corner of the prompts page that you love.
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

	.placeholder-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s-6);
	}
</style>
