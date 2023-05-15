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
			name: 'education'
		}
	});

	const tag2 = await prisma.tag.create({
		data: {
			name: 'OpenAI'
		}
	});

	const prompt1 = await prisma.prompt.create({
		data: {
			description: "some short description what this prompt is about",
			title: 'First prompt',
			author: {
				connect: {
					id: adamUser.id
				}
			},
			content: {
				create: {
					version: '1.0',
					content: 'This is the content of the first prompt',
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

	const prompt2 = await prisma.prompt.create({
		data: {
			description: "some short description what this prompt is about",
			title: 'Second prompt',
			author: {
				connect: {
					id: testUser1.id
				}
			},
			content: {
				create: {
					version: '1.0',
					content: 'This is the content of the second prompt',
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

	const prompt3 = await prisma.prompt.create({
		data: {
			description: "some short description what this prompt is about",
			title: 'Third prompt',
			author: {
				connect: {
					id: adamUser.id
				}
			},
			content: {
				create: {
					version: '1.0',
					content: 'This is the content of the third prompt',
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

	const prompt4 = await prisma.prompt.create({
		data: {
			description: "some short description what this prompt is about",
			title: 'Fourth prompt',
			author: {
				connect: {
					id: testUser2.id
				}
			},
			content: {
				create: {
					version: '1.0',
					content: 'This is the content of the fourth prompt',
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

	const prompt5 = await prisma.prompt.create({
		data: {
			title: 'Fifth prompt',


description: "some short description what this prompt is about",			author: {
				connect: {
					id: testUser1.id
				}
			},
			content: {
				create: {
					version: '1.0',
					content: 'This is the content of the fifth prompt',
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

	const prompt6 = await prisma.prompt.create({
		data: {
			title: 'Sixth prompt',


description: "some short description what this prompt is about",			author: {
				connect: {
					id: adamUser.id
				}
			},
			content: {
				create: {
					version: '1.0',
					content: 'This is the content of the sixth prompt',
					aIModelId: aiModel1.id
				}
			},
			tags: {
				connect: [{ id: tag1.id }, { id: tag2.id }]
			},
			stars: {
				create: [{ userId: testUser1.id }, { userId: testUser2.id }]
			}
		}
	});

	const prompt7 = await prisma.prompt.create({
		data: {
			description: "some short description what this prompt is about",
			title: 'Seventh prompt',
			author: {
				connect: {
					id: testUser2.id
				}
			},
			content: {
				create: {
					version: '1.0',
					content: 'This is the content of the seventh prompt',
					aIModelId: aiModel2.id
				}
			},
			tags: {
				connect: [{ id: tag1.id }]
			},
			stars: {
				create: [{ userId: adamUser.id }]
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
			prompt: {
				connect: {
					id: prompt1.id
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
			prompt: {
				connect: {
					id: prompt1.id
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
