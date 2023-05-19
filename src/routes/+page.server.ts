import { landingLoad } from "$lib/features/landing"
import type { PageServerLoad } from "./explore/$types"

export const load: PageServerLoad = async () => {
  return await landingLoad()
}