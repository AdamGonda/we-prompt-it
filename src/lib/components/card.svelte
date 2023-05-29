<script>
	import { page } from '$app/stores';
	import routes from '$lib/routes';
	import _ from 'lodash';

	export let prompt;
	const dynamicColor = stringToColor(prompt.name + prompt.description)


	// Add this function
	function stringToColor(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let color = '#';
		for (let i = 0; i < 3; i++) {
			let value = (hash >> (i * 8)) & 0xff;
			color += ('00' + value.toString(16)).substr(-2);
		}
		return color;
	}
</script>

<a
	href={routes.prompt($page.data.session?.user, prompt.slug)}
	class="card"
>
	<div>
		<div class="row">
			<p class="name">{prompt.name}</p>
		</div>

		<div class="description">
			<p>{_.truncate(prompt.description, { length: 100 })}</p>
		</div>
	</div>

	<div class="stats">
		<img class="author" src={prompt.author.picture} alt="" />
		<div>
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
