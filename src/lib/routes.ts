export default {
  landing: '/',
  prompt: (inApp, slug) => `${inApp ? '/app' : ''}/prompt/${slug}`
}