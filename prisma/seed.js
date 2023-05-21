import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const adamUser = await prisma.user.create({
		data: {
			firstName: 'Adam',
			lastName: 'Gonda',
			slug: 'adam-gonda',
			email: 'adamgondagyula@gmail.com'
		}
	});

	const testUser1 = await prisma.user.create({
		data: {
			firstName: 'test1 f',
			lastName: 'test1 l',
			slug: 'test1-f-test1 l',
			email: 'testshareloop1@gmail.com'
		}
	});

	const testUser2 = await prisma.user.create({
		data: {
			firstName: 'test2 f',
			lastName: 'test2 l',
			slug: 'test2-f-test2 l',
			email: 'testshareloop2@gmail.com'
		}
	});

	const aiModel1 = await prisma.aIModel.create({
		data: {
			name: 'GPT-4'
		}
	});

	const aiModel2 = await prisma.aIModel.create({
		data: {
			name: 'GPT-5'
		}
	});

	const tag1 = await prisma.tag.create({
		data: {
			name: 'education [key]'
		}
	});

	const tag2 = await prisma.tag.create({
		data: {
			name: 'OpenAI'
		}
	});

	const repo1 = await prisma.repo.create({
		data: {
			description: 'Rediscover the forbidden [key] melodies in a world without music',
			name: 'Melodies Unheard 1',
			slug: 'melodies-unheard-1',
			author: {
				connect: {
					id: adamUser.id
				}
			},
			prompts: {
				create: [
					{
						content:
							'How does the world react when the first note is played after decades of silence?',
						aIModelId: aiModel1.id
					},
					{
						version: 2,
						content: 'How change1 when the first note is change 2 of silence?',
						aIModelId: aiModel1.id
					}
				]
			},
			tags: {
				connect: [{ id: tag1.id }]
			},
			stars: {
				create: [{ userId: testUser1.id }, { userId: testUser2.id }]
			}
		}
	});

	const repo2 = await prisma.repo.create({
		data: {
			description:
				'In a world where colors have been forgotten, one artist has discovered the secret of the rainbow',
			name: 'Colors Rediscovered 2',
			slug: 'colors-rediscovered-2',
			authorId: adamUser.id,
			prompts: {
				create: {
					content:
						'What happens when the artist reveals the first painting full of colors in a monochrome world?',
					aIModelId: aiModel1.id
				}
			},
			tags: {
				connect: [{ id: tag1.id }]
			},
			stars: {
				create: [{ userId: testUser1.id }, { userId: testUser2.id }]
			}
		}
	});

	const repo3 = await prisma.repo.create({
		data: {
			description:
				'An ancient language long lost to history has been rediscovered by an unassuming librarian',
			name: 'Language Unearthed 3',
			slug: 'language-unearthed-3',
			authorId: adamUser.id,
			prompts: {
				create: {
					content:
						'What happens when the librarian deciphers the first message in the ancient language?',
					aIModelId: aiModel2.id
				}
			},
			tags: {
				connect: [{ id: tag2.id }]
			},
			stars: {
				create: [{ userId: adamUser.id }, { userId: testUser1.id }]
			}
		}
	});

	const changeRequest1 = await prisma.changeRequest.create({
		data: {
			title: 'First change request',
			description: 'This is the first change request',
			content: 'Proposed change for first change request',
			author: {
				connect: {
					id: adamUser.id
				}
			}
		}
	});

	const changeRequest2 = await prisma.changeRequest.create({
		data: {
			title: 'Second change request',
			description: 'This is the second change request',
			content: 'Proposed change for second change request',
			author: {
				connect: {
					id: testUser1.id
				}
			},
			repo: {
				connect: {
					id: repo1.id
				}
			}
		}
	});

	const comment1 = await prisma.comment.create({
		data: {
			content: 'This is a comment on the first change request',
			author: {
				connect: {
					id: testUser1.id
				}
			},
			changeRequest: {
				connect: {
					id: changeRequest1.id
				}
			}
		}
	});

	const comment2 = await prisma.comment.create({
		data: {
			content: 'This is a comment on the second change request',
			author: {
				connect: {
					id: adamUser.id
				}
			},
			changeRequest: {
				connect: {
					id: changeRequest2.id
				}
			}
		}
	});

	const follower1 = await prisma.follower.create({
		data: {
			userId: adamUser.id,
			followingId: testUser1.id
		}
	});

	const follower2 = await prisma.follower.create({
		data: {
			userId: testUser1.id,
			followingId: testUser2.id
		}
	});

	const follower3 = await prisma.follower.create({
		data: {
			userId: testUser2.id,
			followingId: adamUser.id
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
