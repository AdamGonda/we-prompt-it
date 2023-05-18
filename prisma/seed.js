import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const adamUser = await prisma.user.create({
		data: {
			firstName: 'Adam',
			lastName: 'Gonda',
			email: 'adamgondagyula@gmail.com'
		}
	});

	const testUser1 = await prisma.user.create({
		data: {
			firstName: 'test1 f',
			lastName: 'test1 l',
			email: 'testshareloop1@gmail.com'
		}
	});

	const testUser2 = await prisma.user.create({
		data: {
			firstName: 'test2 f',
			lastName: 'test2 l',
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
			author: {
				connect: {
					id: adamUser.id
				}
			},
			prompt: {
				create: {
					content:
						'How does the world react when the first note is played after decades of silence?',
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

	const repo2 = await prisma.repo.create({
		data: {
			description: 'A tale of an unexpected journey',
			name: 'Second [key] Expedition 2',
			author: {
				connect: {
					id: testUser1.id
				}
			},
			prompt: {
				create: {
					content:
						'What mysteries will the explorers uncover in their unplanned adventure?',
					aIModelId: aiModel2.id
				}
			},
			tags: {
				connect: [{ id: tag2.id }]
			},
			stars: {
				create: [{ userId: adamUser.id }]
			}
		}
	});

	const repo3 = await prisma.repo.create({
		data: {
			description:
				'In the heart of a bustling city, an unexpected discovery changes everything',
			name: 'Urban Enigma 3',
			author: {
				connect: {
					id: adamUser.id
				}
			},
			prompt: {
				create: {
					content:
						"How does the discovery [key] challenge the protagonist's understanding of their city?",
					aIModelId: aiModel2.id
				}
			},
			tags: {
				connect: [{ id: tag1.id }, { id: tag2.id }]
			},
			stars: {
				create: [{ userId: testUser1.id }]
			}
		}
	});

	const repo4 = await prisma.repo.create({
		data: {
			description: 'A journey to the edge of the known universe',
			name: 'Cosmic Horizon',
			author: {
				connect: {
					id: testUser2.id
				}
			},
			prompt: {
				create: {
					content: 'What awaits the astronaut at the frontier of space?',
					aIModelId: aiModel1.id
				}
			},
			tags: {
				connect: [{ id: tag1.id }]
			},
			stars: {
				create: [{ userId: adamUser.id }, { userId: testUser2.id }]
			}
		}
	});

	const repo5 = await prisma.repo.create({
		data: {
			name: 'Fifth Element',
			description: 'In a world of four elements, a fifth emerges',
			author: {
				connect: {
					id: testUser1.id
				}
			},
			prompt: {
				create: {
					content: 'How does the emergence of the fifth element disrupt the balance?',
					aIModelId: aiModel2.id
				}
			},
			tags: {
				connect: [{ id: tag2.id }]
			},
			stars: {
				create: [
					{ userId: adamUser.id },
					{ userId: testUser1.id },
					{ userId: testUser2.id }
				]
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
			},
			repo: {
				connect: {
					id: repo1.id
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
