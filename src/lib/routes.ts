export default {
	landing: '/',
	prompt: (inApp, slug) => `${inApp ? '/app' : ''}/prompt/${slug}`,
	create: (user) => (user ? '/app/prompt/create' : '/login'),
	myCollection: (user) => (user ? '/app/my-collection' : '/login'),
	login: '/login',
	profile: (username) => `/profile/${username}`,
	fork: (user, slug) => (user ? `/app/prompt/${slug}/fork` : `/login`),
	edit: (slug) => `/app/prompt/${slug}/edit`
};
