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
	<a href={routes.landing} class="create">
		<p>Home</p>
	</a>
	<a href={links.create} class="create">
		<p>Create</p>
	</a>
	<SearchBar />
	
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
		width: 34px;
	}

	a {
		text-decoration: none;
		color: #000000;
		border-radius: 5px;
	}

	p {
		margin: 0;
	}

	.create {
		font-size: 1rem;
		font-weight: 600;
		font-family: 'Inter';

	}
</style>
