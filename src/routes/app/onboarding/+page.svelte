<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { formDataToObject } from '$lib/utils';
	import { createUserSchema } from '$lib/yup-schemas';

	let form;
	let errors;
	let isTouched = {
		name: false
	};

	if(browser && $page.data.dbUser) {
		goto('/')
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

	function handleSubmit() {
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
</script>

<div class="wrap">
	<h1>It seams this is your first time here.</h1>
	<h3>Please choose a user name so everybody knows who made those great prompts.</h3>
	<form
		method="POST"
		bind:this={form}
		on:input={validateForm}
		on:submit|preventDefault={handleSubmit}
	>
		<input
			on:blur={handleFieldChange}
			on:input={handleFieldChange}
			type="text"
			name="name"
			placeholder="Username"
		/>
		<p>{isTouched.name && errors.name ? errors.name : ''}</p>
	</form>
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
