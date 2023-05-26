<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import SearchBar from './search-bar.svelte';
	import { page } from '$app/stores';

	const user = $page.data.session?.user;
	$: links = {
		create: user ? '/app/prompt/create' : '/login',
		myCollection: user ? '/app/my-collection' : '/login'
	};

	function handleSignout() {
		signOut();
	}

	function handleSignin() {
		signIn('google');
	}
</script>

<nav>
	<a href={`/`}>
		<p class="logo">[we]prompt</p>
	</a>

	<SearchBar />

	<a href={links.myCollection}>
		<p>My collection</p>
	</a>

	<a href={links.create} class="create">
		<p>Create prompt</p>
	</a>

	{#if user}
		<button style="cursor: pointer;" on:click={handleSignout}>signout</button>
	{:else}
		<a href={`/login`}>
			<p>Signup/Login</p>
		</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #048ba8;
		padding: 20px 40px;
	}

	a {
		text-decoration: none;
		color: #fff;
	}

	.logo {
		font-size: 1.2rem;
		font-weight: bold;
		color: #fff;
	}

	p {
		margin: 0;
	}

	.create {
		border: 2px solid white;
		padding: 7px;
	}
</style>
