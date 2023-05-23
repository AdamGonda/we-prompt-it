<script>
	$: tags = getTags(_tags);
	let _tags = [];
	let input = '';

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
</style>
