<script>
	import { page } from '$app/stores';
	import routes from '$lib/routes'
	import _ from 'lodash';

	export let prompt;
</script>

<a href={routes.prompt($page.data.session?.user, prompt.slug)} class="card">
	<div class="row">
		<p class="name">{prompt.name}</p>
	</div>

	<div class="description">
		<p>{prompt.description}</p>
	</div>

	<div class="row footer">

		<div class="stats">
			<span class="likes">❤️ {prompt.likes?.length}</span>
			<span class="forked">
				<img src="/fork-icon.png" alt="fork-icon" />
				{prompt.forkedCount}
			</span>
		</div>
	</div>
</a>

<style>
	.card {
		text-decoration: none;
		background: #D9D9D9;
		border-radius: 20px;
		padding: 20px;
		color: black;
	}

	p {
		margin: 0;
		line-height: 1.5;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.name {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.description {
		font-size: 1.15rem;
		font-weight: 400;
		margin-top: 16px;
		margin-bottom: 40px;
	}

	.likes,
	.forked {
		display: flex;
		align-items: center;
		font-size: 0.9rem;
	}

	.forked img {
		width: 15px;
		margin-right: 5px;
	}

	.stats {
		display: flex;
		gap: 8px;
	}


</style>
