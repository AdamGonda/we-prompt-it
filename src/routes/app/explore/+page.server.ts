export async function load({params}) {
	console.log('log load params', params)

	return {  };
}


export const actions = {
	default: async () => {
		console.log('log default action')
	}
};
