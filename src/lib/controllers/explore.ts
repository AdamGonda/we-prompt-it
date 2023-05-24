import { results } from './../stores/search-bar-store';
import { PrismaClient } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { getAllRepos } from "./shared";

const prisma = new PrismaClient();

// #region API
export async function preSearchResultsNo(event) {
	const query = event.url.searchParams.get('q');
	const rawResults = await _search(query);

	if (query) {
		if(rawResults.length === 0) {
			json(0)
		}
	
		return json(rawResults.length)
	}

	return json([]);
}

export async function search(event) {
	const query = event.url.searchParams.get('q');

	if (query) {
		return json(await _search(query));
	}

	return json([]);
}
// #endregion

// #region LOADERS
export async function loadExplore(event) {
	return { r: await _search(event) };
}
// #endregion

// #region PRIVATE 
async function _search(event) {
	// search_bar=a big fat 123 mag
	// &tags=openai,midjuerny,cool,education
	// &prompt_min_length=10
	// &prompt_max_length=50
	// &sort=most_liked
	const searchParams = event.url.searchParams;
	console.log('log searchParams', searchParams)
	const query = searchParams.get('search_bar');


	return await prisma.repo.findMany({
		where: {
			OR: [
				{
					name: {
						contains: query,
						mode: 'insensitive'
					}
				},
				{
					description: {
						contains: query,
						mode: 'insensitive'
					}
				},
				{
          prompts: {
            some: {
              content: {
                contains: query,
                mode: 'insensitive'
              }
            }
          }
        },
        {
          prompts: {
            some: {
              aiModel: {
                name: {
                  contains: query,
                  mode: 'insensitive'
                }
              }
            }
          }
        },
				{
					tags: {
						some: {
							name: {
								contains: query,
								mode: 'insensitive'
							}
						}
					}
				}
			],
			isDeleted: false
		},
		include: {
			tags: { where: { isDeleted: false } },
			stars: { where: { isDeleted: false } },
			prompts: { include: { aiModel: true } },
		}
	});
}
// #endregion