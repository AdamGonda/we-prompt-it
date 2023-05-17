<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Search from './search.svelte';
	import { page } from '$app/stores';

	const session = $page.data.session
</script>

<nav>
	<a href={`/`}>
		<div>Logo</div>
	</a>
	<Search />

	{#if session}
		<a href={`/app/my-collection`}>
			<div>My collection</div>
		</a>
	{:else}
		<a href={`/signup`}>
			<div>My collection</div>
		</a>
	{/if}

	<a href={`/repo/create`}>
		<div>Create prompt</div>
	</a>

	{#if session}
		<button style="cursor: pointer;" on:click={() => signOut()}>signout</button>
	{:else}
		<button style="cursor: pointer;" on:click={() => signIn()}>Signin</button>
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
