<script>
	export let existingTags = ['hello', 'world', 'svelte', 'sveltekit'];
	let _tags = [];
	let input = '';
	let selectsFromSuggested = false;
	let selectedIdx = -1;
	$: tags = _tags.join(', ');
	$: matches = existingTags
		.filter((tag) => input && tag.includes(input))
		.map((tag) => tag.replace(input, `<b>${input}</b>`));

	function cleanTag(tag) {
		return tag.replace(/<b>|<\/b>/g, '');
	}

	function addTag(tag) {
		const clean = cleanTag(tag);
		// not add if already in tags
		if (_tags.includes(clean)) {
			input = '';
			// TODO toster: tag already in added
			return;
		}

		if (clean !== '') {
			_tags = [..._tags, clean];
			input = '';
		}
	}

	function removeTag(index) {
		_tags = _tags.filter((_, i) => i !== index);
	}

	function handleKeyDown(event) {
		if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
			selectsFromSuggested = true;
		}

		if (event.key === 'Enter') {
			if (selectsFromSuggested) {
				addTag(matches[selectedIdx]);
			} else {
				addTag(input);
			}
			event.preventDefault();
		} else if (event.key === 'ArrowUp') {
			if (selectedIdx === 0) {
				selectedIdx = matches.length - 1;
				return;
			}

			if(selectedIdx === -1){
				selectedIdx = matches.length - 1;
				return;
			}

			selectedIdx = Math.max(selectedIdx - 1, 0);
		} else if (event.key === 'ArrowDown') {
			if (selectedIdx === matches.length - 1) {
				selectedIdx = 0;
				return;
			}

			selectedIdx = Math.min(selectedIdx + 1, matches.length - 1);
		} else if (event.key === 'Escape') {
			matches = [];
		}
	}

	function selectSuggested(event) {
		addTag(event.target.innerText);
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
			<button type="button" class="tag-remove" on:click={() => removeTag(index)}
				>&times;</button
			>
		</div>
	{/each}
	{#if matches.length > 0}
		<ul class="matches">
			{#each matches as match, idx}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li
					class:selected={selectedIdx == idx}
					on:click={selectSuggested}
				>
					{@html match}
				</li>
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
		position: relative;
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
		position: absolute;
		top: 20px;
		background: white;
		left: 0;
		right: 0;
		border: 1px solid #ccc;
	}

	.matches li {
		font-weight: normal;
		list-style-type: none;
		padding: 8px;
		cursor: pointer;
	}

	.selected {
		background-color: #d6d6d6;
	}

	.matches li:hover {
		background-color: #b4baaa;
	}
</style>
