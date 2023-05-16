<script>
  // todo
  // when focused, dimm the rest of the page
  // autocomplete, get matches from db (just text) and display them in a dropdown normal, and your search in bold
  // search on enter or cta click
  // clear functionality

  import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	const placeholder = 'Search by name, description, content, tags, or AI model.';

	function handleSubmit({ data, cancel }) {
		const query = data.get('query');

    // do autocomplete
    
    
    // link and calcel if not on explore
    if($page.route.id.indexOf('explore') === -1){
      goto(`/app/explore?query=${query}`);
      cancel()
    }
    
	}
</script>

<form autocomplete="off" method="POST" use:enhance={handleSubmit}>
	<input name="query" type="text" {placeholder} />
</form>

<style>
  input {
    font-size: 1.5rem;
    width: 600px;
    padding: 0.5rem;
  }


</style>