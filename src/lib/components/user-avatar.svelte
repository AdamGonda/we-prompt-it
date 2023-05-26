<script>
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

	const user = $page.data.session?.user;
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
			<img src={user.image} alt="" />
		</button>
		
		{#if showDropdown}
			<ul class="dropdown-menu">
				<li><a href={`/profile/${user.username}`}>Profile</a></li>
				<li><button on:click={handleSignout}>Signout</button></li>
			</ul>
		{/if}
	</div>
{:else}
	<a href="/login">
		<p><u>Login</u> - Signup</p>
	</a>
{/if}

<style>
	p {
		color: white;
		margin: 0;
		font-size: 0.9rem;
	}

	img {
		width: 3rem;
		height: 3rem;
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
		top: 60px;
		right: -20px;
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
