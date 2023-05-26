<script>
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

	const user = $page.data.session?.user;

	function handleSignout() {
		signOut();
	}
</script>

{#if user}
	<button style="cursor: pointer;" on:click={handleSignout}>signout</button>
{:else}
	<a href={`/login`}>
		<p><u>Login</u> - Signup</p>
	</a>
{/if}

<style>
	p {
		color: white;
		margin: 0;
		font-size: 0.9rem;
	}
</style>
