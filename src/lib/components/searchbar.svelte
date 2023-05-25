<script>
  let form
  let placeholder = 'Search for images'

  function handleSubmit() {
    const formData = new FormData(form)
    console.log(formData.get('text-search'))
  }
</script>

<form name="search" method="POST" bind:this={form} on:submit|preventDefault={handleSubmit}>
  <input type="text" name="text-search" placeholder={placeholder}>
  <button>search</button>
</form>