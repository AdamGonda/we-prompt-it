import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const adamUser = await prisma.user.create({
		data: {
			firstName: 'Adam',
			lastName: 'Gonda',
			username: 'adamgonda',
			email: 'adamgondagyula@gmail.com',
			// random image from https://thispersondoesnotexist.com/
			picture: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/49/4909a82a493bf33a38205a7ddc71baed32037d9c_full.jpg',
		}
	});

	const testUser1 = await prisma.user.create({
		data: {
			firstName: 'test1 f',
			lastName: 'test1 l',
			username: 'test1',
			email: 'testshareloop1@gmail.com',
			picture: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/45/4578f901a42efc6575484a9a6dbc89a661f2b9d0_full.jpg',
		}
	});

	const testUser2 = await prisma.user.create({
		data: {
			firstName: 'test2 f',
			lastName: 'test2 l',
			username: 'test2',
			email: 'testshareloop2@gmail.com',
			picture: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/2d/2da353a91551c2c67a4f57b4d7d306b9b4b0cf14_full.jpg',
		}
	});

	const aiModel1 = await prisma.aiModel.create({
		data: {
			name: 'GPT-4',
			link: 'https://chat.openai.com/'
		}
	});

	const aiModel2 = await prisma.aiModel.create({
		data: {
			name: 'GPT-5',
			link: 'https://chat.openai.com/'
		}
	});

	const aiModel3 = await prisma.aiModel.create({
		data: {
			name: 'GPT-6',
			link: 'https://chat.openai.com/'
		}
	});

	const tag1 = await prisma.tag.create({
		data: {
			name: 'education'
		}
	});

	const tag2 = await prisma.tag.create({
		data: {
			name: 'OpenAI'
		}
	});

	const tag3 = await prisma.tag.create({
		data: {
			name: 'Midjuarny'
		}
	});

	const tag4 = await prisma.tag.create({
		data: {
			name: 'technology'
		}
	});

	const tag5 = await prisma.tag.create({
		data: {
			name: 'science'
		}
	});

	const tag6 = await prisma.tag.create({
		data: {
			name: 'fiction'
		}
	});

	const prompt1 = await prisma.prompt.create({
		data: {
			description: 'Rediscover the forbidden [key] melodies in a world without music',
			name: 'Melodies Unheard 1',
			slug: 'adamgonda-melodies-unheard-1',
			author: {
				connect: {
					id: adamUser.id
				}
			},
			content:
				'How does the world react when the first note is played after decades of silence?',
			aiModel: {
				connect: {
					id: aiModel1.id
				}
			},
			tags: {
				connect: [{ id: tag1.id }, { id: tag3.id }, { id: tag6.id }]
			},
			likes: {
				create: [{ userId: testUser1.id }, { userId: testUser2.id }]
			}
		}
	});

	const prompt2 = await prisma.prompt.create({
		data: {
			description:
				'In a world where colors have been forgotten, one artist has discovered the secret of the rainbow',
			name: 'Colors Rediscovered 2',
			slug: 'test1-colors-rediscovered-2',
			authorId: testUser1.id,
			content:
				'What happens when the artist reveals the first painting full of colors in a monochrome world?',
			aiModelId: aiModel1.id,
			tags: {
				connect: [{ id: tag1.id }, { id: tag4.id }]
			},
			likes: {
				create: [{ userId: testUser1.id }, { userId: testUser2.id }]
			}
		}
	});

	const prompt3 = await prisma.prompt.create({
		data: {
			description:
				'An ancient language long lost to history has been rediscovered by an unassuming librarian',
			name: 'Language Unearthed 3',
			slug: 'test2-language-unearthed-3',
			authorId: testUser2.id,
			content:
				'What happens when the librarian deciphers the first message in the ancient language?',
			aiModelId: aiModel3.id,
			tags: {
				connect: [{ id: tag2.id }, { id: tag5.id }]
			},
			likes: {
				create: [
					{ userId: adamUser.id },
					{ userId: testUser1.id },
					{ userId: testUser2.id }
				]
			}
		}
	});

	const prompt4 = await prisma.prompt.create({
		data: {
			description: 'Lorem ipsum dolor sit amet',
			name: 'Prompt 4',
			slug: 'prompt-4',
			authorId: adamUser.id,
			content: 'Prompt for Prompt 4',
			aiModelId: aiModel1.id,
			tags: {
				connect: [{ id: tag1.id }, { id: tag2.id }, { id: tag4.id }]
			},
			likes: {
				create: [{ userId: testUser1.id }, { userId: testUser2.id }]
			}
		}
	});

	const prompt5 = await prisma.prompt.create({
		data: {
			description: 'Lorem ipsum dolor sit amet',
			name: 'Prompt 5',
			slug: 'prompt-5',
			authorId: testUser1.id,
			content: 'Prompt for Prompt 5',
			aiModelId: aiModel2.id,
			tags: {
				connect: [{ id: tag2.id }, { id: tag3.id }, { id: tag5.id }]
			},
			likes: {
				create: [{ userId: adamUser.id }, { userId: testUser1.id }]
			}
		}
	});

	const prompt6 = await prisma.prompt.create({
		data: {
			description: 'Lorem ipsum dolor sit amet',
			name: 'Prompt 6',
			slug: 'prompt-6',
			authorId: testUser2.id,
			content: 'Prompt for Prompt 6',
			aiModelId: aiModel1.id,
			tags: {
				connect: [{ id: tag1.id }, { id: tag3.id }, { id: tag6.id }]
			},
			likes: {
				create: [{ userId: adamUser.id }, { userId: testUser2.id }]
			}
		}
	});

	const prompt7 = await prisma.prompt.create({
		data: {
			description: 'Lorem ipsum dolor sit amet',
			name: 'Prompt 7',
			slug: 'prompt-7',
			authorId: adamUser.id,
			content: 'Prompt for Prompt 7',
			aiModelId: aiModel2.id,
			tags: {
				connect: [{ id: tag2.id }, { id: tag3.id }, { id: tag5.id }]
			},
			likes: {
				create: [
					{ userId: testUser1.id },
					{ userId: testUser2.id },
					{ userId: adamUser.id }
				]
			}
		}
	});

	const prompt8 = await prisma.prompt.create({
		data: {
			description: 'Lorem ipsum dolor sit amet',
			name: 'Prompt 8',
			slug: 'prompt-8',
			authorId: testUser1.id,
			content: 'Prompt for Prompt 8',
			aiModelId: aiModel1.id,
			tags: {
				connect: [{ id: tag1.id }, { id: tag2.id }, { id: tag4.id }]
			},
			likes: {
				create: [{ userId: adamUser.id }, { userId: testUser2.id }]
			}
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
