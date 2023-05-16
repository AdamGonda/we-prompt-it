<script>
	import { countries } from './countriesData.js';
	import Country from './Country.svelte';

	/* FILTERING countres DATA BASED ON INPUT */
	let filteredCountries = [];
	// $: console.log(filteredCountries)

	const filterCountries = () => {
		let storageArr = [];
		if (inputValue) {
			countries.forEach((country) => {
				if (country.toLowerCase().startsWith(inputValue.toLowerCase())) {
					storageArr = [...storageArr, makeMatchBold(country)];
				}
			});
		}
		filteredCountries = storageArr;
	};

	/* HANDLING THE INPUT */
	let searchInput; // use with bind:this to focus element
	let inputValue = '';

	$: if (!inputValue) {
		filteredCountries = [];
		hiLiteIndex = null;
	}

	const clearInput = () => {
		inputValue = '';
		searchInput.focus();
	};

	const setInputVal = (countryName) => {
		inputValue = removeBold(countryName);
		filteredCountries = [];
		hiLiteIndex = null;
		document.querySelector('#country-input').focus();
	};

	const submitValue = () => {
		if (inputValue) {
			console.log(`${inputValue} is submitted!`);
			setTimeout(clearInput, 1000);
		} else {
			alert("You didn't type anything.");
		}
	};

	const makeMatchBold = (str) => {
		// replace part of (country name === inputValue) with strong tags
		let matched = str.substring(0, inputValue.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	};

	const removeBold = (str) => {
		//replace < and > all characters between
		return str.replace(/<(.)*?>/g, '');
		// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
	};

	/* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */
	let hiLiteIndex = null;
	//$: console.log(hiLiteIndex);
	$: hiLitedCountry = filteredCountries[hiLiteIndex];

	const navigateList = (e) => {
		if (e.key === 'ArrowDown' && hiLiteIndex <= filteredCountries.length - 1) {
			hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
		} else if (e.key === 'ArrowUp' && hiLiteIndex !== null) {
			hiLiteIndex === 0
				? (hiLiteIndex = filteredCountries.length - 1)
				: (hiLiteIndex -= 1);
		} else if (e.key === 'Enter') {
			setInputVal(filteredCountries[hiLiteIndex]);
		} else {
			return;
		}
	};
</script>

<svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault={submitValue}>
	<div class="autocomplete">
		<input
			id="country-input"
			type="text"
			placeholder="Search Country Names"
			bind:this={searchInput}
			bind:value={inputValue}
			on:input={filterCountries}
		/>
	</div>

	<input type="submit" />

	<!-- FILTERED LIST OF COUNTRIES -->
	{#if filteredCountries.length > 0}
		<ul id="autocomplete-items-list">
			{#each filteredCountries as country, i}
				<Country
					itemLabel={country}
					highlighted={i === hiLiteIndex}
					on:click={() => setInputVal(country)}
				/>
			{/each}
		</ul>
	{/if}
</form>

<style>
	div.autocomplete {
		/*the container must be positioned relative:*/
		position: relative;
		display: inline-block;
		width: 300px;
	}
	input {
		border: 1px solid transparent;
		background-color: #f1f1f1;
		padding: 10px;
		font-size: 16px;
		margin: 0;
	}
	input[type='text'] {
		background-color: #f1f1f1;
		width: 100%;
	}
	input[type='submit'] {
		background-color: DodgerBlue;
		color: #fff;
	}

	#autocomplete-items-list {
		position: relative;
		margin: 0;
		padding: 0;
		top: 0;
		width: 297px;
		border: 1px solid #ddd;
		background-color: #ddd;
	}
</style>
