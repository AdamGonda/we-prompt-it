<script>
  import { onMount } from 'svelte';

  let items = Array.from({ length: 60 }); // initial data
  let isLoading

  const loadMoreItems = () => {
    isLoading= true;
    setTimeout(() => {
      items = [...items, ...Array.from({ length: 20 })]; // append more items
      isLoading= false;
    }, 1000);
  }

  onMount(() => {
    const callback = (e) => {
      const scrollY = window.scrollY; 
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      const remaining = pageHeight - visible - scrollY;

      if (bottomOfPage || remaining < 50) {
        loadMoreItems();
      }
    };
    
    window.addEventListener('scroll', callback);

    return () => {
      window.removeEventListener('scroll', callback);
    };
  });
</script>

<div id="scroll-container">
  {#each items as item, i}
    <div class="item">Item {i + 1}</div>
  {/each}
  {#if isLoading}
    <div class="loading">Loading...</div>
  {/if}
</div>
