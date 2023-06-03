<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { formDataToObject } from '$lib/utils';
	import { createUserSchema } from '$lib/yup-schemas';
	import { signIn } from '@auth/sveltekit/client';

	let form;
	const user = $page.data.dbUser;
	let onboard = false;
	let errors;
	let isTouched = {
		name: false
	};

	if (browser && user) {
		if (user.isOnboarded) {
			goto('/');
		} else if (!user.isOnboarded) {
			onboard = true;
		}
	}

	async function validateForm() {
		errors = {};
		const formData = formDataToObject(new FormData(form));

		try {
			createUserSchema.validateSync(formData, { abortEarly: false });
		} catch (error) {
			error.inner.forEach((err) => {
				errors[err.path] = err.errors[0];
			});
		}

		nameCheck(formData);
	}

	async function nameCheck(formData) {
		if (formData.name) {
			let url = `/api/username-check?proposedName=${formData.name}`;

			const r = await fetch(url);
			const json = await r.json();

			if (!json.ok) {
				errors.name = 'Name is not unique';
			}
		}
	}

	function handleFieldChange(event) {
		if (isTouched[event.target.name]) {
			return;
		}

		isTouched[event.target.name] = true;
		validateForm();
	}
</script>

<svelte:head>
	<title>Login | We Prompt</title>
</svelte:head>

<div class="wrap">
	{#if onboard}
		<h1>It seams this is you first time here</h1>
		<h3>Choose a username</h3>
		<form method="POST" bind:this={form} on:input={validateForm}>
			<input
				on:blur={handleFieldChange}
				on:input={handleFieldChange}
				type="text"
				name="name"
				placeholder="Username"
			/>
			<p>{isTouched.name && errors.name ? errors.name : ''}</p>
		</form>
	{:else}
		<h1>Welcome back, Idea Weaver!</h1>
		<h3>Time to explore, craft, and share AI prompts!</h3>
		<button class="bubble" on:click={() => signIn('google')}>
			<img src="/google-logo.png" alt="Google Logo" />
			Continue with Google</button
		>
	{/if}

	<p style="margin-top: 450px">terms of service</p>
</div>

<style>
	h1,
	h3 {
		font-weight: 400;
		text-align: center;
		margin: 0;
	}

	h1 {
		margin: var(--s-3);
		margin-bottom: var(--s-2);
	}

	h3 {
		margin-bottom: var(--s-6);
	}

	.wrap {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	button {
		background: #e9e9e9;
		border-radius: var(--br-2);
		display: flex;
		align-items: center;
		padding: var(--s-4);
		gap: var(--s-4);
		border: none;
		cursor: pointer;
		font-weight: 600;
	}

	button img {
		width: 30px;
	}
</style>
