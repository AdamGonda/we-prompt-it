<script>
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import _ from 'lodash';

	export let prompt;
	let inApp = false;

	if (browser && $page.data.session?.user) {
		inApp = true;
	}
</script>

<a href={`${inApp ? '/app' : ''}/prompt/${prompt.slug}`} class="card">
	<div class="row">
		<p class="name">{prompt.name}</p>
		<img class="profile" src={prompt.author.picture} alt="author" />
	</div>

	<div class="description">
		<p>{prompt.description}</p>
	</div>

	<div class="row footer">
		<p class="model">{prompt.aiModel.name}</p>
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
		border-radius: 5px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 8px;
		color: #ffffff;
		background: linear-gradient(to left, #24243e 0%, #302b63 50%, #0f0c29 100%);
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

	.model {
		font-weight: 600;
		padding: 4px 8px;
		border-radius: 12px;
		border: 2px solid #6fcf97;
		color: #fff;
		font-size: 0.85rem;
	}

	.name {
		font-size: 1.1rem;
		font-weight: 600;
		color: #ffffff;
		margin-bottom: 5px;
	}

	.likes,
	.forked {
		display: flex;
		align-items: center;
		font-size: 0.9rem;
		color: #ffffff;
	}

	.forked img {
		width: 15px;
		margin-right: 5px;
		filter: invert(1);
	}

	.stats {
		display: flex;
		gap: 16px;
	}

	.profile {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 2px solid #ffffff;
		object-fit: cover;
	}

	.description {
		margin-top: 10px;
		font-size: 1.15rem;
	}

	.description p {
		line-height: 1.3;
	}

	.footer {
		margin-top: 16px;
	}
</style>
