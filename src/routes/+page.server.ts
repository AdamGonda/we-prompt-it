import { landingLoad } from "$lib/controllers/landing"
import type { PageServerLoad } from "./explore/$types"

export const load: PageServerLoad = async () => {
  return await landingLoad()
}