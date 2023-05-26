<script>
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import _ from 'lodash';

	export let prompt;
	let inApp = false;
	let selectedTags;
	let isModelSelected;
	$: smartTags = getSmartTags(selectedTags, prompt.tags);

	afterNavigate(() => {
		let searchParams = new URLSearchParams($page.url.search);
		selectedTags = searchParams.getAll('tag');
		isModelSelected = searchParams.getAll('ai_model').includes(prompt.aiModel.name);
	});

	function getSmartTags(selectedTags, promptTags) {
		if (!selectedTags) return promptTags;

		let smartTags = promptTags.map((tag) => {
			return {
				...tag,
				isSelected: selectedTags.includes(tag.name)
			};
		});

		return smartTags;
	}

	if (browser && $page.data.session?.user) {
		inApp = true;
	}
</script>

<a href={`${inApp ? '/app' : ''}/prompt/${prompt.slug}`} class="card">
	<div class="row top">
		<p class="name">{prompt.name}</p>
		<img class="profile" src={prompt.author.picture} alt="author" />
	</div>

	<div class="row">
		<p class="model" class:model-highlight={isModelSelected}>{prompt.aiModel.name}</p>
		<div class="stats">
			<span class="likes">❤️ {prompt.likes?.length}</span>
			<span class="forked">
				<img src="/fork-icon.png" alt="fork-icon" />
				{prompt.forkedCount}
			</span>
		</div>
	</div>

	<div class="tags">
		{#each smartTags as tag}
			<span class:tag-highlight={tag.isSelected}>{tag.name}</span>
		{/each}
	</div>

	<div class="excerpt">
		<p>{_.truncate(prompt.content, { length: 90 })}</p>
	</div>
</a>

<style>
	:global(body) {
		background: rgb(245, 245, 245);
	}

	.card {
		text-decoration: none;
		border-radius: 5px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: #ffffff;
		max-height: 200px;
		background: linear-gradient(to left, #24243e 0%, #302b63 50%, #0f0c29 100%);
	}

	.tag-highlight {
		background-color: #ffffff !important;
		color: #24243e;
	}

	.model-highlight {
		background: #6fcf97;
		color: #24243e !important
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

	.tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.tags span {
		background-color: rgba(255, 255, 255, 0.2);
		padding: 4px 8px;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
		color: #ffffff;
	}

	.tags span.tag-highlight {
		background-color: #ffffff;
		color: #24243e;
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

	.excerpt {
		margin-top: 10px;
	}

	.top {
	}
</style>
