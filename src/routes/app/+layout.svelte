<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from "$lib/components/navigation.svelte";

</script>

<Navigation user={$page.data.user}/>

<div class="content">
	<slot />
</div>

<footer>
	<span>footer</span>
</footer>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: bold;
		font-size: 25px;
	}

	.content {
		padding: 0 16px;
	}

	footer {
		margin-top: 48px;
		background-color: grey;
		color: whitesmoke;
		text-align: center;
		padding: 24px 0;
	}
</style>
