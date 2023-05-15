<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	export let user = null;
</script>

<nav>
	<a href={`/app`}>
		<div>Logo</div>
	</a>
	{#if user}
		<a href={`/app/explore`}>
			<div>Explore</div>
		</a>

		<!-- Prompt -->
		<a href={`/app/prompt/create`}>
			<div>Create prompt</div>
		</a>
		<a href={`/app/prompt/1`}>
			<div>Prompt</div>
		</a>
		<a href={`/app/prompt/1/edit`}>
			<div>Edit prompt</div>
		</a>

		<!-- Profile -->
		<!-- <a href={`/app/profile/1`}>
			<div>Profile</div>
		</a>
		<a href={`/app/profile/edit/1`}>
			<div>Edit profile</div>
		</a>

		<a href={`/app/my-collection`}>
			<div>My collection</div>
		</a> -->

		<!-- Change request -->
		<!-- <a href={`/app/change-request/1`}>
			<div>Change request</div>
		</a>
		<a href={`/app/change-request/create`}>
			<div>Create change request</div>
		</a>
		<a href={`/app/change-request/edit/1`}>
			<div>Edit change request</div>
		</a> -->
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
