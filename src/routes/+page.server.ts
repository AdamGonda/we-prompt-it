import { getLandingData } from "$lib/feature/landing"
import type { PageServerLoad } from "./explore/$types"

export const load: PageServerLoad = async () => {
  return await getLandingData()
}