<script>
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import { stringToColor } from '$lib/utils';
	import BadWordsNext from 'bad-words-next';
	import en from 'bad-words-next/data/en.json';
	const badwords = new BadWordsNext({ data: en });

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
		const minLength = 3;
		const maxLength = 20;
		const maxTags = 5;

		const isTooShort = tag.length < minLength;
		const isTooLong = tag.length > maxLength;
		const tooManyTags = _tags.length >= maxTags;
		const isAlreadyAdded = _tags.includes(tag);
		const isProfane = badwords.check(tag);

		if (isTooShort) {
			input = '';
			toast.push(`Tag is too short. It should be at least ${minLength} characters.`);

			return;
		}

		if (isTooLong) {
			input = '';
			toast.push(`Tag is too long. It should be no more than ${maxLength} characters.`);
			return;
		}

		if (isAlreadyAdded) {
			input = '';
			toast.push(`This tag is already added. Consider adding a similar or related tag.`);
			return;
		}

		if (tooManyTags) {
			input = '';
			toast.push(
				`You can add a maximum of ${maxTags} tags. Please remove a tag before adding another.`
			);
			return;
		}

		if (isProfane) {
			input = '';
			toast.push(
				`Tag contains profanity. Try a different tag or contact us if you think this is a mistake.`
			);
			return;
		}

		return true;
	}

	function cleanTag(tag) {
		return tag
			.toLowerCase()
			.replace(/<b>|<\/b>/g, '')
			.trim()
			.replace(' ', '-')
			.replace('_', '');
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
				<span style={`background-color: ${stringToColor(tag)}`} class="bubble"
					>#{tag}
					<button type="button" on:click={() => removeTag(index)}>
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 664 664"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							xml:space="preserve"
							style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:square;stroke-miterlimit:1.5;"
						>
							<g transform="matrix(1,0,0,1,-7100,-24891)">
								<g transform="matrix(1,0,0,1,-26623.9,9530.87)">
									<g id="x-icon">
										<g
											id="tick"
											transform="matrix(0.593179,0,0,0.593179,13499.7,6673.28)"
										>
											<path
												d="M34298.4,15560.2L35010.2,14848.4"
												style="fill:none;stroke:white;stroke-width:224.78px;"
											/>
										</g>
										<g
											id="tick1"
											transform="matrix(-0.593179,0,0,0.593179,54612.1,6673.28)"
										>
											<path
												d="M34298.4,15560.2L35010.2,14848.4"
												style="fill:none;stroke:white;stroke-width:224.78px;"
											/>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</button>
				</span>
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

	input[type='text'] {
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
		user-select: none;
		position: relative;
		display: inline-block;
		padding-right: 30px;
	}

	.tag button {
		position: absolute;
		cursor: pointer;
		border: none;
		background: none;
		top: 51%;
		transform: translateY(-50%);
		right: 12px;
		width: 9px;
		padding: 0;
		margin: 0;
		opacity: 0.8;
	}
	
	.tag button:hover {
		opacity: 1;
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
