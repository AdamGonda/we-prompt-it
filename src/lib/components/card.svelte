<script>
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import _ from 'lodash';

	export let prompt;
	let inApp = false;
	let selectedTags;
	$: smartTags = getSmartTags(selectedTags, prompt.tags)

	afterNavigate(() => {
		let searchParams = new URLSearchParams($page.url.search);
		selectedTags = searchParams.getAll('tag');
	});

	function getSmartTags(selectedTags, promptTags) {
		if (!selectedTags) return promptTags;

		let smartTags = promptTags.map((tag) => {
			return {
				...tag,
				isSelected: selectedTags.includes(tag.name),
			}
		});

		return smartTags;
	}

	if (browser && $page.data.session?.user) {
		inApp = true;
	}
</script>

<a href={`${inApp ? '/app' : ''}/prompt/${prompt.slug}`}>
	<div class="infos">
		<p class="model">{prompt.aiModel.name}</p>
		<div>
			<span class="likes">❤️ {prompt.likes?.length}</span>
			<span class="forked">
				<img src="/fork-icon.png" alt="fork-icon" />
				{prompt.forkedCount}
			</span>
		</div>
	</div>

	<p class="name">{prompt.name}</p>

	<div class="tags">
		{#each smartTags as tag}
			<span class:highlight={tag.isSelected}>{tag.name}</span>
		{/each}
	</div>

	<div class="excerpt">
		<p>{_.truncate(prompt.content, { length: 50 })}</p>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		border: 2px solid black;
		border-radius: 2px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: black;
		max-height: 150px;
	}

	.highlight {
		background-color: #9d9d9d !important;
		color: white;
	}

	p {
		margin: 0;
	}

	.infos {
		display: flex;
		justify-content: space-between;
	}

	.model {
		font-weight: bold;
		padding: 4px 8px;
		border-radius: 8px;
		border: 1px solid black;
	}

	.tags {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.tags span {
		background-color: #e5e5e5;
		padding: 4px 8px;
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.name {
		font-size: 1.1rem;
		font-weight: bold;
	}
</style>
