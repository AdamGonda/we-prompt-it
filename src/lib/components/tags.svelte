<script>
	import { page } from '$app/stores';
	import { stringToColor } from '$lib/utils';

	const allTags = getAllTags();
	let _tags = getExistingPromptTags();
	let input = '';
	let selectsFromSuggested = false;
	let selectedIdx = -1;
	$: tags = _tags.join(', ');
	$: matches = getMatches(input);

	function getAllTags() {
		const tags = $page.data?.tags?.map((tag) => tag.name);

		return tags ? tags : [];
	}

	function getExistingPromptTags() {
		const tags = $page.data?.prompt?.tags.map((tag) => tag.name);

		return tags ? tags : [];
	}

	function getMatches(input) {
		if (input === '') {
			return [];
		}

		const regex = new RegExp(`(${input})`, 'gi');

		return allTags
			.filter((tag) => tag.toLowerCase().includes(input.toLowerCase()))
			.map((tag) => tag.replace(regex, '<b>$1</b>'));
	}

	function validateNewTag(tag) {
		// Check length
		const isTooShort = tag.length < 3;
		const isAlreadyAdded = _tags.includes(tag);
		const moreThanOneWord = tag.includes(' ');

		if (isTooShort) {
			input = '';
			// TODO: toaster - tag too short
			return;
		}

		// Check if not already in tags
		if (isAlreadyAdded) {
			input = '';
			// TODO: toaster - tag already added
			return;
		}

		// it can be just one word
		if (moreThanOneWord) {
			input = '';
			// TODO: toaster - it can be just one word
			return;
		}

		return true;
	}

	function cleanTag(tag) {
		return tag
			.replace(/<b>|<\/b>/g, '')
			.toString()
			.trim();
	}

	function addTag(tag) {
		const clean = cleanTag(tag);

		if (validateNewTag(clean)) {
			_tags = [..._tags, clean];
			input = '';
		}

		resetStates();
	}

	function removeTag(index) {
		_tags = _tags.filter((_, i) => i !== index);
	}

	function handleKeyDown(event) {
		if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
			selectsFromSuggested = true;
		}

		if (input === '') {
			return;
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

			if (selectedIdx === -1) {
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

	function resetStates() {
		selectedIdx = -1;
		selectsFromSuggested = false;
	}
</script>

<div class="tag-selector">
	<input type="hidden" name="tags" bind:value={tags} />
	<input
		type="text"
		bind:value={input}
		on:keydown={handleKeyDown}
		on:blur={resetStates}
		placeholder="Enter a tag"
	/>

	<div class="tags">
		{#each _tags as tag, index}
			<div class="tag">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span
					on:click={() => removeTag(index)}
					style={`background-color: ${stringToColor(tag)}`}
					class="bubble">#{tag}</span
				>
			</div>
		{/each}
	</div>

	{#if matches.length > 0}
		<ul class="matches">
			{#each matches as match, idx}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li class:selected={selectedIdx == idx} on:click={selectSuggested}>
					{@html match}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.tag-selector {
		display: flex;
		flex-direction: column;
		gap: var(--fs-2);
		align-items: center;
		position: relative;
	}

	input[type="text"] {
		width: 150px;
		font-size: var(--fs-2);
		font-weight: bold;
		text-align: center;
		border: none;
		border-bottom: 2px solid rgb(120, 120, 120);
	}

	input:focus {
		outline: none;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
    gap: var(--fs-2);
	}

	.tag {
		display: flex;
		flex-wrap: wrap;
		gap: var(--fs-2);
		justify-content: center;
	}

	.tag span {
		font-size: var(--fs-1);
		color: white;
		font-weight: 500;
		cursor: pointer;
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
