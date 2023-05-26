import type { PageServerLoad } from "./explore/$types"

export const load: PageServerLoad = async (event) => {
  return {
    session: await event.locals.getSession(),
  }
}