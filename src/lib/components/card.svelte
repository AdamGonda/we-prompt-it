<script>
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import _ from 'lodash';

	export let prompt;
	let inApp = false;
	let selectedTags;
	$: smartTags = getSmartTags(selectedTags, prompt.tags);

	afterNavigate(() => {
		let searchParams = new URLSearchParams($page.url.search);
		selectedTags = searchParams.getAll('tag');
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

<a href={`${inApp ? '/app' : ''}/prompt/${prompt.slug}`}>
	<div class="row top">
		<p class="name">{prompt.name}</p>
		<img class="profile" src={prompt.author.picture} alt="author" />
	</div>

	<div class="row">
		<p class="model">{prompt.aiModel.name}</p>
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
			<span class:highlight={tag.isSelected}>{tag.name}</span>
		{/each}
	</div>

	<div class="excerpt">
		<p>{_.truncate(prompt.content, { length: 105 })}</p>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		border: 2px solid #2f80ed;
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: #333;
		max-height: 200px;
		background: #f7f9fc;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
	}

	.highlight {
		background-color: #2f80ed !important;
		color: white;
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
		background-color: #6fcf97; /* Different color for AI Model */
		color: #333;
		font-size: 0.85rem;
	}

	.tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.tags span {
		background-color: #e0e0e0;
		padding: 4px 8px;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
		color: #333;
	}

	.tags span.highlight {
		background-color: #2f80ed;
		color: white;
	}

	.name {
		font-size: 1.1rem;
		font-weight: 600;
		color: #2f80ed;
		margin-bottom: 5px;
	}

	.likes,
	.forked {
		display: flex;
		align-items: center;
		font-size: 0.9rem;
		color: #828282;
	}

	.forked img {
		width: 15px;
		margin-right: 5px;
	}

	.stats {
		display: flex;
		gap: 16px;
	}

	.profile {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 2px solid #2f80ed;
		object-fit: cover;
	}

	.excerpt {
		margin-top: 10px;
	}

	.top {
	}
</style>
