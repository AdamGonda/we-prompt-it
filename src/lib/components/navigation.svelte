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
		<img src="logo.svg" width="40px" alt="logo" />
	</a>

	<SearchBar />

	<div>
		<a href={links.myCollection}>
			<p>My collection</p>
		</a>

		<a href={links.create} class="create">
			<p>Create prompt</p>
		</a>
	</div>

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
		background: #34cff2;
		padding: 20px 40px;
		background-image: linear-gradient(to left, #24243e 0%, #302b63 50%, #0f0c29 100%);
	}

	div {
		display: flex;
		align-items: center;
		gap: 34px;
	}

	a {
		text-decoration: none;
		color: #ffffff;
	}

	p {
		margin: 0;
	}

	.create {
		padding: 7px;
		border: 2px solid white;
	}
</style>
