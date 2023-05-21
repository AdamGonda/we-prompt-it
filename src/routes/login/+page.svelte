<svelte:head>
    <title>Login | We Prompt</title> 
</svelte:head>

<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
    import { signIn, signOut } from '@auth/sveltekit/client';

    const user = $page.data.session?.user;

    if(browser && user) {
        goto('/')
    }
</script>

<!-- open ai style -->

<button style="cursor: pointer;" on:click={() => signIn("google")} data-testid="login">Continue with google</button>
