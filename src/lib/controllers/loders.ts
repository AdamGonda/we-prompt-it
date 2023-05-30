import { PrismaClient } from '@prisma/client';
import { getAllAIModels, getAllTags, getDBUser, getPromptBySlug } from "./shared";
import globalIncludes from '$lib/global-includes';
import { error } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function loadExplore(event) {
	return { 
		prompts: await _search(event),
		tags: await getAllTags(),
		aiModels: await getAllAIModels()
	};
}

export async function loadLanding() {
	const mostLiked = await prisma.prompt.findMany({
		where: {
			isDeleted: false
		},
		include: {
			likes: { where: { isDeleted: false } },
			tags: true,
			aiModel: true,
			author: true
		},
		orderBy: {
			likes: {
				_count: 'desc'
			}
		},
		take: 10
	});

	const mostForked = await prisma.prompt.findMany({
		where: {
			isDeleted: false
		},
		include: {
			likes: true,
			aiModel: true,
			author: true
			,
			tags: true
		},
		orderBy: {
			forkedCount: 'desc'
		},
		take: 10
	});

	return { mostLiked, mostForked };
}

export async function _search(event) {
	const query = {
		where: {
			AND: [
				{
					isDeleted: false
				}
			]
		},
		...globalIncludes
	};

	_handleSearchBar(query, event);
	_handleTags(query, event);
	_handleAiModel(query, event);
	_handleSortBy(query, event);
	_handlePagination(query, event);

	return await prisma.prompt.findMany(query);
}

export async function loadMyCollection(event) {
	const dbUser = await getDBUser(event);

	const createdBy = await prisma.prompt.findMany({
		where: {
			authorId: dbUser.id,
			isDeleted: false
		},
		include: {
			likes: { where: { isDeleted: false } },
			tags: true,
			aiModel: true,
			author: true,
		}
	});

	const forked = createdBy.filter((prompt) => prompt.parentId !== null);

	const like = await prisma.like.findMany({
		where: {
			userId: dbUser.id,
			isDeleted: false
		},
		include: {
			prompt: {
				include: {
					likes: { where: { isDeleted: false } },
					tags: true,
					aiModel: true,
					author: true
				}
			}
		}
	});

	return {
		forked,
		createdBy,
		liked: like?.map((like) => like.prompt)
	};
}

export async function loadPrompt(event) {
	const prompt = await getPromptBySlug(event.params.slug);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	if (!prompt) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { prompt, aiModels, tags, user: await getDBUser(event) };
}

export async function loadEdit({ params }) {
	const prompt = await getPromptBySlug(params.slug);
	const aiModels = await getAllAIModels();
	const tags = await getAllTags();

	if (!prompt) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { prompt, aiModels, tags };
}

export async function loadCreatePrompt() {
	const allModels = await getAllAIModels();
	const tags = await getAllTags();

	return { allModels, tags };
}



function _handlePagination(query, event){
	const page = event.url.searchParams.get('page');
	const limit = event.url.searchParams.get('limit');

	if (page && limit) {
		query.skip = parseInt(page) * parseInt(limit);
		query.take = parseInt(limit);
	}
}

function _handleSearchBar(query, event) {
	const WORDS_LIMIT = 5;
	const text = event.url.searchParams.get('text');

	if (text === null) {
		return;
	}

	if(text.includes(' ') && text.split(' ').length > WORDS_LIMIT) {
		throw new Error(`You can search for a maximum of ${WORDS_LIMIT} words`);
	}

	const searchInName = {
		name: {
			contains: text,
			mode: 'insensitive'
		}
	};

	const searchInDescription = {
		description: {
			contains: text,
			mode: 'insensitive'
		}
	};

	const searchInPromptsContent = {
		content: {
			contains: text,
			mode: 'insensitive'
		}
	};

	if (text) {
		query.where.OR = [searchInName, searchInDescription, searchInPromptsContent];
	}
}

function _handleTags(query, event) {
	const tags = event.url.searchParams.getAll('tag')

	if (tags?.length > 0) {
		query.where.AND.push({
			tags: {
				some: {
					name: {
						in: tags
					}
				}
			}
		});
	}
}

function _handleAiModel(query, event) {
	const aiModel = event.url.searchParams.get('ai_model');

	if (aiModel) {
		query.where.AND.push({
			aiModel: {
				name: aiModel
			}
		});
	}
}

function _handleSortBy(query, event) {
	const sort = event.url.searchParams.getAll('sort_by');

	if (sort.length === 0) {
		return;
	}

	query.orderBy = [];

	if (sort.includes('most_liked')) {
		query.orderBy.push({
			likes: {
				_count: 'desc'
			}
		});
	}

	if (sort.includes('most_forked')) {
		query.orderBy.push({
			forkedCount: 'desc'
		});
	}
}