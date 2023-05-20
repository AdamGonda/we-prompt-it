export function formDataToObject(formData) {
	const formValues = {};
	for (const [key, value] of formData.entries()) {
		if (!isNaN(value)) {
			formValues[key] = Number(value);
		} else {
			formValues[key] = value;
		}
	}
	return formValues;
}

export function zodCheck(parseResult, onError) {
	if (!parseResult.success) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const errors = parseResult.error.errors.map((error) => {
			return {
				field: error.path[0],
				message: error.message
			};
		});

		onError(errors);
	}

	return parseResult.data;
}
