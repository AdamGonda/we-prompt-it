<script lang="ts">
	import SearchBar from './search-bar.svelte';
	import { page } from '$app/stores';
	import UserAvatar from './user-avatar.svelte';
	import routes from '$lib/routes';

	const user = $page.data.session?.user;
	$: links = {
		create: routes.create(user),
		myCollection: routes.myCollection(user)
	};
	$: onMycollection = $page.route.id.includes('my-collection')
	$: onCreate = $page.route.id.includes('create') || $page.route.id.includes('fork')
</script>

<nav>
	<a href={routes.landing} class="logo">
		<img src="/weprompt-logo.png" alt="logo" />
	</a>
	<SearchBar />

	<a href={routes.myCollection(user)} class="button">
		<p class="my-collection" class:underline={onMycollection} >My collection</p>
	</a>
	<a href={links.create} class="button">
		<p class:underline={onCreate}>Create</p>
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

	.underline {
		text-decoration: underline;
	}
</style>
