import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const adamUser = await prisma.user.create({
		data: {
			firstName: 'Adam',
			lastName: 'Gonda',
			username: 'adamgonda',
			email: 'adamgondagyula@gmail.com'
		}
	});

	const testUser1 = await prisma.user.create({
		data: {
			firstName: 'test1 f',
			lastName: 'test1 l',
			username: 'test1',
			email: 'testshareloop1@gmail.com'
		}
	});

	const testUser2 = await prisma.user.create({
		data: {
			firstName: 'test2 f',
			lastName: 'test2 l',
			username: 'test2',
			email: 'testshareloop2@gmail.com'
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
				connect: [{ id: tag1.id }, { id: tag3.id }]
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
				connect: [{ id: tag1.id }]
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
			aiModelId: aiModel2.id,
			tags: {
				connect: [{ id: tag2.id }]
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
			content:'Prompt for Prompt 4',
			aiModelId: aiModel1.id,
			tags: {
				connect: [{ id: tag1.id }, { id: tag2.id }]
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
			content:'Prompt for Prompt 5',
			aiModelId: aiModel2.id,
			tags: {
				connect: [{ id: tag2.id }, { id: tag3.id }]
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
			content:'Prompt for Prompt 6',
			aiModelId: aiModel1.id,
			tags: {
				connect: [{ id: tag1.id }, { id: tag3.id }]
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
			content:'Prompt for Prompt 7',
			aiModelId: aiModel2.id,
			tags: {
				connect: [{ id: tag2.id }, { id: tag3.id }]
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
			content:'Prompt for Prompt 8',
			aiModelId: aiModel1.id,
			tags: {
				connect: [{ id: tag1.id }, { id: tag2.id }]
			},
			likes: {
				create: [{ userId: adamUser.id }, { userId: testUser2.id }]
			}
		}
	});

	// const changeRequest1 = await prisma.changeRequest.create({
	// 	data: {
	// 		title: 'First change request',
	// 		description: 'This is the first change request',
	// 		content:'Proposed change for first change request',
	// 		author: {
	// 			connect: {
	// 				id: adamUser.id
	// 			}
	// 		}
	// 	}
	// });

	// const changeRequest2 = await prisma.changeRequest.create({
	// 	data: {
	// 		title: 'Second change request',
	// 		description: 'This is the second change request',
	// 		content:'Proposed change for second change request',
	// 		author: {
	// 			connect: {
	// 				id: testUser1.id
	// 			}
	// 		},
	// 		prompt: {
	// 			connect: {
	// 				id: prompt1.id
	// 			}
	// 		}
	// 	}
	// });

	// const comment1 = await prisma.comment.create({
	// 	data: {
	// 		content:'This is a comment on the first change request',
	// 		author: {
	// 			connect: {
	// 				id: testUser1.id
	// 			}
	// 		},
	// 		changeRequest: {
	// 			connect: {
	// 				id: changeRequest1.id
	// 			}
	// 		}
	// 	}
	// });

	// const comment2 = await prisma.comment.create({
	// 	data: {
	// 		content:'This is a comment on the second change request',
	// 		author: {
	// 			connect: {
	// 				id: adamUser.id
	// 			}
	// 		},
	// 		changeRequest: {
	// 			connect: {
	// 				id: changeRequest2.id
	// 			}
	// 		}
	// 	}
	// });

	// const follower1 = await prisma.follower.create({
	// 	data: {
	// 		userId: adamUser.id,
	// 		followingId: testUser1.id
	// 	}
	// });

	// const follower2 = await prisma.follower.create({
	// 	data: {
	// 		userId: testUser1.id,
	// 		followingId: testUser2.id
	// 	}
	// });

	// const follower3 = await prisma.follower.create({
	// 	data: {
	// 		userId: testUser2.id,
	// 		followingId: adamUser.id
	// 	}
	// });
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
