import { PrismaClient } from "@prisma/client";

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

