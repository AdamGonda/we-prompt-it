<script>
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import routes from '$lib/routes';
	import { signOut } from '@auth/sveltekit/client';
	import { onMount } from 'svelte';

	$: user = $page.data.dbUser;
	let showDropdown = false;

	onMount(() => {
		window.addEventListener('click', (e) => {
			if (e.target.closest('.dropdown')) return;
			showDropdown = false;
		});
	});

	function handleSignout() {
		signOut();
	}

	function toggleShowDropdown() {
		showDropdown = !showDropdown;
	}
</script>

{#if user}
	<div class="dropdown">
		<button class="dropdown-trigger" on:click={toggleShowDropdown}>
			<img src={user.image} alt="" />
		</button>

		{#if showDropdown}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<ul class="dropdown-menu" on:click={toggleShowDropdown}>
				<li>
					<a
						href={routes.profile(user.username)}
						on:click={() => invalidate(routes.profile(user.username))}>Profile</a
					>
				</li>
				<li><button on:click={handleSignout}>Signout</button></li>
			</ul>
		{/if}
	</div>
{:else}
	<div class="login">
		<a href={routes.login}>Login</a>
	</div>
{/if}

<style>
	img {
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-trigger {
		background: none;
		border: none;
		cursor: pointer;
		border-radius: 50%;
		position: relative;
	}

	.dropdown-menu {
		position: absolute;
		top: 40px;
		right: -25px;
		background: white;
		padding: 24px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		list-style: none;
		margin: 0;
		padding: 0;
		z-index: 10;
		padding: 8px;
	}

	.dropdown-menu li,
	button {
		font-family: 'Source Sans Pro', sans-serif !important;
		font-weight: 400;
	}

	button {
		border: none;
		background: none;
		padding: 0;
	}

	.dropdown-menu a,
	.dropdown-menu button {
		color: black;
		text-decoration: none;
		background: none;
		border: none;
		cursor: pointer;
		display: block;
		font-size: 1.2rem;
	}

	.dropdown-menu a:hover,
	.dropdown-menu button:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.login {

	}

	.login a {
		color: black;
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
	}
</style>
