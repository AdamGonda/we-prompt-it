import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';
import { getAllRepos } from './shared';

const prisma = new PrismaClient();

// #region API
export async function preSearchResultsNo(event) {
	const query = event.url.searchParams.get('q');
	const rawResults = await _search(query);

	if (query) {
		if (rawResults.length === 0) {
			json(0);
		}

		return json(rawResults.length);
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
	// examples:
	// search_bar=a big fat 123 mag
	// tags=openai,midjuerny,cool,education
	// ai_model=OpenAI
	// sort=most_liked | most_forked

	const query = {
		where: {
			AND: [
				{
					isDeleted: false
				}
			]
		},
		include: {
			tags: { where: { isDeleted: false } },
			stars: { where: { isDeleted: false } },
			prompts: { include: { aiModel: true } }
		}
	};

	handleSearchbarQueryes(query, event);
	handleTagsQueryes(query, event);
	handleAiModelQuery(query, event);
	handleSortQuery(query, event);

	return await prisma.repo.findMany(query); 
}
// #endregion

function handleSearchbarQueryes(query, event) {
	let searchBar = event.url.searchParams.get('search_bar');

	if (searchBar === null) {
		return;
	}

	if (searchBar.includes(' ')) {
		searchBar = `'${searchBar}'`;
	}

	const searchInName = {
		name: {
			contains: searchBar,
			mode: 'insensitive'
		}
	};

	const searchInDescription = {
		description: {
			contains: searchBar,
			mode: 'insensitive'
		}
	};

	const searchInPromptsContent = {
		prompts: {
			some: {
				AND: [
					{
						content: {
							contains: searchBar,
							mode: 'insensitive'
						}
					}
				]
			}
		}
	};

	if (searchBar) { 
		query.where.OR = [searchInName, searchInDescription, searchInPromptsContent];
	}
}

function handleTagsQueryes(query, event) {
	const tags = event.url.searchParams.get('tags')?.split(',') || [];

	if (tags?.length > 0) {
		query.where.AND.push({
			tags: {
				every: {
					name: {
						in: tags
					}
				}
			}
		});
	}
}

function handleAiModelQuery(query, event) {
	const aiModel = event.url.searchParams.get('ai_model');

	if (aiModel) {
		query.where.AND.push({
			prompts: {
				some: {
					aiModel: {
						name: aiModel
					}
				}
			}
		});
	}
}

function handleSortQuery(query, event) {
	const sort = event.url.searchParams.get('sort_by');

	if (sort === 'most_liked') {
		console.log('log ', ) 
		query.orderBy = {
			likeCount: 'desc'
		};
	} else if (sort === 'most_forked') {
		query.orderBy = {
			noTimesForked: 'desc'
		};
	}
}
