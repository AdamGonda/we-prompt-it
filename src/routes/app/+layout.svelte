<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/navigation.svelte';
	import { searchFocused } from '$lib/stores/search';
</script>

<Navigation user={$page.data.user} />

<div class="overlay-ref">
	<div class="overlay" class:show={$searchFocused} />
	<div class="content">
		<slot />
	</div>

	<footer>
		<span>footer</span>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: bold;
		font-size: 25px;
	}

	.content {
		padding: 0 16px;
		min-height: calc(100vh - 93px);
	}

	.overlay-ref {
		position: relative;
	}

	.overlay {
		background: #1b1b1bca;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: none;
	}

	.show {
		display: block;
	}

	footer {
		margin-top: 48px;
		background-color: grey;
		color: whitesmoke;
		text-align: center;
		padding: 24px 0;
	}
</style>
