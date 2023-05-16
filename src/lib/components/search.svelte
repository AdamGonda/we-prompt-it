<script>
	// todo
	// when focused, dimm the rest of the page
	// autocomplete, get matches from db (just text) and display them in a dropdown normal, and your search in bold
	// search on enter or cta click
	// clear functionality

	import { page } from '$app/stores';
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

		// do autocomplete

    // do search
    const r = await fetch(`/api/search?q=${query}`)
    const json = await r.json()
    console.log('log r', json)
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
