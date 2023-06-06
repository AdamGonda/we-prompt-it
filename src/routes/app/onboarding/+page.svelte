<script>
	import { browser } from '$app/environment';
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { formDataToObject } from '$lib/utils';
	import { createUserSchema } from '$lib/yup-schemas';
	import { toast } from '@zerodevx/svelte-toast';
	import _ from 'lodash';

	let form;
	let errors = {}
	$: disabled = getDisabled(errors, isTouched);
	let isTouched = {
		name: false
	};

	beforeNavigate(({ cancel, to }) => {
		if (browser && $page.data.forceOnboarding) {
			if (to.route.id !== 'app/onboarding') {
				cancel();
				toast.push('You need to complete the onboarding first.')
			}
		}
	});

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
				errors.name = 'This name is already taken.';
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

	function handleSubmit() {
		if (errors.name) {
			return;
		}

		fetch(`/api/create-user?username=${form.name.value}`, {
			method: 'POST'
		})
			.then((r) => r.json())
			.then((json) => {
				if (json.status === 200) {
					window.location.href = '/';
				}
			});
	}

	function getDisabled(errors, isTouched) {
		const anyError = Object.keys(errors).length > 0;
		const hasUntouched = _.every(isTouched, (v) => !v);

		return anyError || hasUntouched;
	}
</script>

<svelte:head>
	<title>Onboarding | We Prompt</title>
</svelte:head>

<div class="wrap">
	<h1>I see you are new around here 😃</h1>
	<h4>How sould we call you?</h4>
	<form
		method="POST"
		bind:this={form}
		on:input={validateForm}
		on:submit|preventDefault={handleSubmit}
	>
		<div class="name-wrap">
			<input
				class:invalid={isTouched.name && errors.name}
				on:blur={handleFieldChange}
				on:input={handleFieldChange}
				autocomplete="off"
				type="text"
				name="name"
				placeholder="Username"
			/>
			<span class="error">{isTouched.name && errors.name ? errors.name : ''}</span>
		</div>
		<div class="submit-wrap">
			<input {disabled} class="bubble" type="submit" value="Submit" />
		</div>
	</form>
</div>

<style>
	h1,
	h4 {
		font-weight: 400;
		text-align: center;
		margin: 0;
	}

	h1 {
		margin: var(--s-3);
		margin-bottom: var(--s-2);
	}

	h4 {
		margin-bottom: var(--s-6);
	}

	.wrap {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.name-wrap {
		margin-bottom: var(--s-4);
		display: flex;
		flex-direction: column;
	}

	input[type='text'] {
		font-size: var(--fs-3);
		font-weight: bold;
		text-align: center;
		border: none;
		border-bottom: 2px solid rgb(120, 120, 120);
	}

	input:focus {
		outline: none;
	}

	.error {
		margin-top: var(--s-1);
		color: var(--danger);
		align-self: center;
	}

	.submit-wrap {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.submit-wrap input {
		background: var(--sucess);
		color: whitesmoke;
		border: none;
		font-size: var(--fs-2);
		cursor: pointer;
	}

	.submit-wrap input:hover {
		background: var(--sucess-hover)
	}

	.submit-wrap input:disabled {
		background: #b3b3b3;
		cursor: not-allowed;
	}

	.invalid {
		border-bottom: 4px solid var(--danger) !important;
		color: var(--danger);
	}

	input.invalid::placeholder {
		color: var(--danger);
	}
</style>
