<script>
	import { page } from '$app/stores';
	import CardList from '$lib/components/card-list.svelte';

	const user = $page.data.user;
</script>

<div class="profile">
	<img src={user.picture} alt="user" />
	<p>{user.username}</p>
</div>

<CardList prompts={user.prompts} />

<style>
	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--s-7);
	}

	img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
	}

	p {
		font-weight: bold;
		margin-top: var(--s-4);
	}
</style>
