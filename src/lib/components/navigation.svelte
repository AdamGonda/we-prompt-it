<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Search from './search.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const user = $page.data.session?.user;

	function handleSignout() {
		signOut();
	}

	function handleSignin() {
		signIn('google');
	}
</script>

<nav>
	<a href={`/`}>
		<div>Logo</div>
	</a>
	<Search />

	{#if user}
		<a href={`/app/my-collection`}>
			<div>My collection</div>
		</a>
	{:else}
		<a href={`/signup`}>
			<div>My collection</div>
		</a>
	{/if}

	{#if user}
		<a href={`/app/repo/create`}>
			<div>Create prompt</div>
		</a>
	{:else}
		<a href={`/signup`}>
			<div>Create prompt</div>
		</a>
	{/if}

	{#if user}
		<button style="cursor: pointer;" on:click={handleSignout}>signout</button>
	{:else}
		<button style="cursor: pointer;" on:click={handleSignin}>Signin</button>
		/
		<a href={`/signup`}>
			<p>Signup</p>
		</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		background: rgb(144, 144, 144);
		padding: 20px 40px;
	}

	a {
		text-decoration: none;
	}

	div {
		background: rgb(112, 112, 112);
		padding: 10px 20px;
		color: whitesmoke;
	}
</style>
