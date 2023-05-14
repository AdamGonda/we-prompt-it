<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	export let user = null;
</script>

<nav>
	<a href={`/app`}>
		<div>Logo</div>
	</a>
	{#if user}
		<a href={`/app/listing`}>
			<div>Explore</div>
		</a>
		<a href={`/app/create-prompt`}>
			<div>Create prompt</div>
		</a>
		<a href={`/app/edit-profile/1`}>
			<div>Edit profile</div>
		</a>
		<a href={`/app/edit-prompt/1`}>
			<div>Edit prompt</div>
		</a>
		<a href={`/app/my-collection`}>
			<div>My collection</div>
		</a>
		<a href={`/app/profile/1`}>
			<div>Profile</div>
		</a>
		<a href={`/app/prompt/1`}>
			<div>Prompt</div>
		</a>
		<div style="cursor: pointer;" on:click={() => signOut()}>{user?.firstName}</div>
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
