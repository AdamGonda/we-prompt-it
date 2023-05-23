<script>
	export let existingTags = ['hello', 'world'];
	let _tags = [];
	let input = 'l';
	$: tags = getTags(_tags);

  // find matches from existing tags that substring match with input
  // and highlight matchinkg substring with <b> tag
  $: matches = existingTags.filter(tag => input && tag.includes(input)).map(tag => tag.replace(input, `<b>${input}</b>`));

	function getTags(tags) {
		return tags.join(', ');
	}

	function addTag() {
		if (input.trim() !== '') {
			_tags = [..._tags, input.trim()];
			input = '';
		}
	}

	function removeTag(index) {
		_tags = _tags.filter((_, i) => i !== index);
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			addTag();
			event.preventDefault();
		}
	}
</script>

<div class="tag-selector">
	<input type="hidden" name="tags" bind:value={tags} />
	<input
		type="text"
		bind:value={input}
		on:keydown={handleKeyDown}
		placeholder="Enter a tag"
	/>
	{#each _tags as tag, index}
		<div class="tag">
			<span class="tag-text">{tag}</span>
			<button class="tag-remove" on:click={() => removeTag(index)}>&times;</button>
		</div>
	{/each}
	{#if matches.length > 0}
		<ul class="matches">
			{#each matches as match}
      
				<li>{@html match}</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.tag-selector {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		padding: 4px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.tag {
		display: flex;
		align-items: center;
		padding: 4px;
		background-color: #eee;
		border-radius: 4px;
	}

	.tag-text {
		margin-right: 4px;
	}

	.tag-remove {
		cursor: pointer;
		font-weight: bold;
	}

  .matches {
    padding: 0;
  }

  .matches li {
    font-weight: normal;
    list-style-type: none;
  }
</style>
