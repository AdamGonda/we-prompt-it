<script lang="ts">
	import Navigation from '$lib/components/navigation.svelte';
	import { searchFocused } from '$lib/stores/search-bar-store';

</script>

<Navigation />

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
		font-family: 'Inter';
		box-sizing: border-box;
		box-sizing: border-box;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.content {
		min-height: calc(100vh - 93px);
	}

	.overlay-ref {
		position: relative;
		/* padding-top: 24px; */
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
