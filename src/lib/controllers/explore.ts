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
	const query = event.url.searchParams.get('q');

	if (query) {
		return { initialLoadResults: await _search(query) };
	}

	return { initialLoadResults: await getAllRepos() };
}
// #endregion

// #region PRIVATE 
async function _search(query) {
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