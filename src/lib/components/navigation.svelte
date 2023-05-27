<script lang="ts">
	import SearchBar from './search-bar.svelte';
	import { page } from '$app/stores';
	import UserAvatar from './user-avatar.svelte';
	import SearchManagger from './search-managger.svelte';

	const user = $page.data.session?.user;
	$: links = {
		create: user ? '/app/prompt/create' : '/login',
		myCollection: user ? '/app/my-collection' : '/login'
	};
</script>

<nav>
	<SearchManagger />
	<a href={`/`} class="logo">
		<img src="logo.svg" width="40px" alt="logo" />
	</a>

	<div class="all-but-logo">
		<SearchBar />

		<div>
			<div class="button-island">
				<a href={links.myCollection}>
					<p>My collection</p>
				</a>
				
				<a href={links.create} class="create">
					<p>Create prompt</p>
				</a>
			</div>

			<UserAvatar />
		</div>
	</div>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		background: #34cff2;
		padding: 20px 40px;
		padding: 20px 56px;
		background-image: linear-gradient(to left, #24243e 0%, #302b63 50%, #0f0c29 100%);
	}

	div {
		display: flex;
		align-items: center;
		gap: 34px;
	}

	.button-island {
		display: flex;
		align-items: center;
		gap: 34px;
		margin-right: 20px;
	}

	a {
		text-decoration: none;
		color: #ffffff;
		border-radius: 5px;
	}

	p {
		margin: 0;
	}

	.logo {
		margin-right: 140px;
	}

	.all-but-logo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.create {
		padding: 7px 12px;
		border: 2px solid white;
	}
</style>
