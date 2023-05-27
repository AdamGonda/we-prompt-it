export default {
  landing: '/',
  prompt: (inApp, slug) => `${inApp ? '/app' : ''}/prompt/${slug}`,
  create: (user) => user ? '/app/prompt/create' : '/login',
  myCollection: (user) => user ? '/app/my-collection' : '/login',
}