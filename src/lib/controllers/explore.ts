import { PrismaClient } from "@prisma/client";
import { json } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function searchRepos(query) {
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

export async function preSearchResultsNo(event) {
	const query = event.url.searchParams.get('q');
	const rawResults = await searchRepos(query);

	if (query) {
		if(rawResults.length === 0) {
			json(0)
		}
	
		return json(rawResults.length)
	}

	return json([]);
}
