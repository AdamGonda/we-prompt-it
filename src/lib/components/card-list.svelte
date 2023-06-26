<script>

	import Card from "./card.svelte";

  export let prompts = [];

</script>
<div class="card-list">
  {#each prompts as prompt (prompt.id)}
    <Card {prompt} />
  {/each}
</div>

<style>
	.card-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));		
		gap: 34px;
		width: 100%;
	}
</style>
