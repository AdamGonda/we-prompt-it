<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';
	import { fadeConfig } from '$lib/config';
	import { fade } from 'svelte/transition';

</script>

<svelte:head>
	<title>Profile | We Prompt</title>
</svelte:head>

<div in:fade={fadeConfig}>
	<div class="top">
		<div class="stats">
			<div class="stat">
				<p>All prompts</p>
				<span>{$page.data.allPrompts}</span>
			</div>
			<div class="stat">
				<p>Likes given</p>
				<span>{$page.data.likesGiven}</span>
			</div>
		</div>

		<div class="user">
			<img src={$page.data.profileUser?.image} alt="user" />
			<p>{$page.data.profileUser?.username}</p>
		</div>

		<div class="stats">
			<div class="stat">
				<p>Likes received</p>
				<span>{$page.data.likesReceived}</span>
			</div>
			<div class="stat">
				<p>Forked</p>
				<span>{$page.data.forked}</span>
			</div>
		</div>
	</div>

	{#if $page.data.profileUser.prompts.length === 0}
		<div class="placeholder bubble">
			<p>Seems like this user is new and hasn't crafted any prompts yet!</p>
		</div>
	{:else}
		<CardList prompts={$page.data.profileUser.prompts} />
	{/if}
</div>

<style>
	.top {
		display: flex;
		justify-content: center;
		margin-bottom: var(--s-7);
		gap: 120px
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		width: 25%;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.stat p {
		margin: 0;
		font-size: var(--fs-3);
		text-decoration: underline;
	}

	.stat span {
		margin-top: var(--s-3);
		font-size: var(--fs-4);
		font-weight: bold;
	}

	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.user img {
		width: 130px;
		height: 130px;
		border-radius: 50%;
	}

	.user p {
		font-weight: bold;
		margin-top: var(--s-4);
	}

	.placeholder {
		margin: 0 auto;
		text-align: center;
	}

	@media (max-width: 768px) {
		.stats {
			display: none;
		}
	}
</style>
