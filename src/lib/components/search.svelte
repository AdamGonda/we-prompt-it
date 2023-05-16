<script>
	// todo
	// when focused, dimm the rest of the page
	// autocomplete, get matches from db (just text) and display them in a dropdown normal, and your search in bold
	// search on enter or cta click
	// clear functionality

	import { page } from '$app/stores';
  import { results } from '$lib/stores/search';
	import { goto, afterNavigate } from '$app/navigation';

	let form = null;

	afterNavigate(() => {
		if (form && $page.route.id === '/app') {
			form.reset();
		}
	});

	const placeholder = 'Search by name, description, content, tags, or AI model.';

	async function handleSubmit() {
		const formData = new FormData(form);
    const query = formData.get('query');

    
    if ($page.route.id.indexOf('explore') === -1) {
      goto(`/app/explore?q=${query}`);
      return
    }

		// todo autocomplete

    // hit search
    const r = await fetch(`/api/search?q=${query}`)
    const json = await r.json()

    // update results
    results.update(() => json)
    // updare search params in url
    // todo
	}
</script>

<form
	autocomplete="off"
	bind:this={form}
	action="/api/search"
	on:submit|preventDefault={handleSubmit}
>
	<input name="query" type="text" {placeholder} />
</form>

<style>
	input {
		font-size: 1.5rem;
		width: 600px;
		padding: 0.5rem;
	}
</style>
