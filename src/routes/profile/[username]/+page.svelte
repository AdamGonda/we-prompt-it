<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';

	const user = $page.data.user;
</script>

<svelte:head>
	<title>Profile | We Prompt</title>
</svelte:head>

<div class="profile">
	<img src={user?.image} alt="user" />
	<p>{user?.username}</p>
</div>

{#if user.prompts.length === 0}
	<div class="placeholder bubble">
		<p>Seems like this user is new and hasn't crafted any prompts yet!</p>
	</div>
{:else}
	<CardList prompts={user.prompts} />
{/if}

<style>
	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--s-7);
	}

	.profile img {
		width: 130px;
		height: 130px;
		border-radius: 50%;
	}

	.profile p {
		font-weight: bold;
		margin-top: var(--s-4);
	}

	.placeholder {
		margin: 0 auto;
		text-align: center;
	}
</style>
