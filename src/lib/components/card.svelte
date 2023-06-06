<script>
	import { page } from '$app/stores';
	import { fadeConfig } from '$lib/config';
	import routes from '$lib/routes';
	import _ from 'lodash';
	import { fade } from 'svelte/transition';

	export let prompt;

	function getHartIconPrefix() {
		if ($page.data.dbUser) {
			const liked = prompt.likes.find((like) => like.userId === $page.data.dbUser.id);
			if (liked) {
				return 'fullhart';
			}
		}
		return 'hart';
	}
</script>

<a href={routes.prompt($page.data.session?.user, prompt.slug)} class="card" in:fade={fadeConfig}>
	<div>
		<div class="row">
			<p class="name">{prompt.name}</p>
		</div>

		<div class="description">
			<p>{_.truncate(prompt.description, { length: 100 })}</p>
		</div>
	</div>

	<div class="stats">
		<div>
			<img class="author" src={prompt.author.image} alt="" />
			<p class="model">{prompt.aiModel.name}</p>
		</div>

		<div>
			<span class="likes">
				<img
					style="width: 16px"
					src={`/${getHartIconPrefix()}-icon.svg`}
					alt="hart-icon"
				/>
				{prompt.likes?.length}</span
			>
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
		background: #e9e9e9;
		border-radius: 20px;
		padding: 20px;
		color: black;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
		width: 100%;
		border-bottom: 1px solid rgb(174, 174, 174);
	}

	.model {
		margin-top: var(--s-3);
		margin-left: var(--s-4);
		position: relative;
	}

	.model::before {
		position: absolute;
		content: 'Model';
		font-size: 10px;
		top: -10px;
	}

	.description {
		font-size: 1.15rem;
		font-weight: 400;
		margin-top: var(--s-4);
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
		justify-content: space-between;
		gap: 8px;
	}

	.stats div {
		display: flex;
		gap: 8px;
	}

	.author {
		border-radius: 50%;
		width: 40px;
	}
</style>
