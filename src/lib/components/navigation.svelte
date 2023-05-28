<script lang="ts">
	import SearchBar from './search-bar.svelte';
	import { page } from '$app/stores';
	import UserAvatar from './user-avatar.svelte';
	import SearchManagger from './search-managger.svelte';
	import routes from '$lib/routes';

	const user = $page.data.session?.user;
	$: links = {
		create: routes.create(user),
		myCollection: routes.myCollection(user)
	};
</script>

<nav>
	<SearchManagger />
	<a href={routes.landing} class="logo">
		<img src="/weprompt-logo.png" alt="logo" />
	</a>
	<SearchBar />

	<a href={routes.landing} class="button">
		<p class="my-collection">My collection</p>
	</a>
	<a href={links.create} class="button">
		<p>Create</p>
	</a>
	<UserAvatar />
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		padding: 20px 24px;
		gap: 30px;
		height: 80px;
	}

	img {
		width: 38px;
		margin-top: 3px;
	}

	a {
		text-decoration: none;
		color: #000000;
		border-radius: 5px;
	}

	p {
		margin: 0;
	}

	.button {
		font-size: 1rem;
		font-weight: 600;
	}

	.my-collection {
		width: 104px;
	}
</style>
