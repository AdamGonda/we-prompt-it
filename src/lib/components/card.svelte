<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let prompt;
	let inApp = false;

	if (browser && $page.data.session?.user) {
		inApp = true;
	}
</script>

<a href={`${inApp ? '/app' : ''}/prompt/${prompt.slug}`}>
	<div>
		<p>{prompt.name}</p>
		
		<div class="excerpt">
			<p>{prompt.content}</p>
		</div>

		<div class="tags">
			{#each prompt.tags as tag}
				<span>{tag.name}</span>
			{/each}
		</div>
		
		<div class="infos">
			<span class="model">{prompt.aiModel.name}</span>
			<span class="likes">❤️ {prompt.likes?.length}</span>
			<span class="forked"><img src="/fork-icon.png" alt="fork-icon" /> {prompt.forkedCount}</span>
		</div>
	</div>
</a>

<style>
	
</style>
