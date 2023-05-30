<script>
	import { page } from '$app/stores';
	import routes from '$lib/routes';
	import { signOut } from '@auth/sveltekit/client';

	const user = $page.data.dbUser;
	let showDropdown = false;

	function handleSignout() {
		signOut();
	}

	function toggleWhoDropdown() {
		showDropdown = !showDropdown;
	}
</script>

{#if user}
	<div class="dropdown">
		<button class="dropdown-trigger" on:click={toggleWhoDropdown}>
			<img src={user.picture} alt="" />
		</button>
		
		{#if showDropdown}
			<ul class="dropdown-menu">
				<li><a href={routes.profile(user.username)}>Profile</a></li>
				<li><button on:click={handleSignout}>Signout</button></li>
			</ul>
		{/if}
	</div>
{/if}

<style>
	p {
		color: white;
		margin: 0;
		font-size: 0.9rem;
	}

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

	.dropdown-menu li, button {
		font-family: 'Source Sans Pro', sans-serif !important;
		font-weight: bold;
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
</style>
