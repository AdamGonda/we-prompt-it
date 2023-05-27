export default {
  prompt: (inApp, slug) => `${inApp ? '/app' : ''}/prompt/${slug}`
}