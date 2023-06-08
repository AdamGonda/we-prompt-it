<script>
	import { page } from "$app/stores";
	import CardList from "$lib/components/card-list.svelte";

  $: prompts = $page.data.prompts
</script>
<svelte:head>
	<title>Home | We Prompt</title>
</svelte:head>

<div class="hero-section">
	<div class="hero-wrap">
    <div class="hero-text-wrap">
      <div>
        <h1>
          A place for you
          <br/>
          and you prompts.
        </h1>
        <h2>Explore, collect, create and get noticed.</h2>
      </div>
  
      <div class="cta-s">
        <button class="signup">Sign up</button>
        <button class="explore">Explore</button>
      </div>
    </div>
    <img src="/cloud.png" alt="word-cloud" />
  </div>
</div>

<h3>Top 10</h3>
<CardList {prompts}/>

<style>
  .hero-section {
    display: flex;
    justify-content: center;
    padding-top: var(--s-9);
    margin-bottom: 170px;
  }

  .hero-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1070px;
  }

  h1 {
    font-size: 2.7rem;
    margin: 0;
  }
  
  h2 {
    margin: 0;
    margin-top: var(--s-2);
    font-weight: 400;
    font-size: 1.1rem;
  }
  
  .cta-s {
    margin-top: var(--s-9);
  }

  img {
    width: 500px;
  }

  .signup,.explore {
    border: none;
    font-size: var(--fs-3);
    border-radius: var(--br-2);
    padding: var(--s-3) var(--s-5);
  }

  .signup {
    color: var(--white);
    background: var(--black);
    margin-right: var(--s-2);
  }

  .explore {
    color: var(--black);
    background: none;
    border: 3px solid var(--black);
    padding: var(--s-2) var(--s-5);
    color: var(--black);

  }

  .hero-text-wrap {
    margin-top: -50px;
  }
  
</style>