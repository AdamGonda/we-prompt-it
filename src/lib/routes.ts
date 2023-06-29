export default {
	landing: '/',
	trends: '/trends',
	prompt: (inApp, slug) => `${inApp ? '/app' : ''}/prompt/${slug}`,
	create: '/app/prompt/create',
	myCollection: '/app/my-collection',
	login: '/login',
	profile: (username) => `/profile/${username}`,
	fork: (user, slug) => (user ? `/app/prompt/${slug}/fork` : `/login`),
	edit: (slug) => `/app/prompt/${slug}/edit`
};
