import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

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
			likes:  { where: { isDeleted: false } },
			aiModel: true 
		}
	};

	handleSearchBar(query, event);
	handleTags(query, event);
	handleAiModel(query, event);
	handleSortBy(query, event);

	return await prisma.prompt.findMany(query); 
}
// #endregion

function handleSearchBar(query, event) {
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
		content: {
			contains: searchBar,
			mode: 'insensitive'
		}
	};

	if (searchBar) { 
		query.where.OR = [searchInName, searchInDescription, searchInPromptsContent];
	}
}

function handleTags(query, event) {
	const tags = event.url.searchParams.get('tags')?.split(',') || [];

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

function handleAiModel(query, event) {
	const aiModel = event.url.searchParams.get('ai_model');

	if (aiModel) {
		query.where.AND.push({
			aiModel: {
				name: aiModel
			}
		});
	}
}

function handleSortBy(query, event) {
	const sort = event.url.searchParams.getAll('sort_by');

	console.log('log sort', sort)

	if (sort.length === 0) {
		return;
	}

	query.orderBy = []

	if (sort.includes('most_liked')) {
		query.orderBy.push({
			likes: {
				_count: 'desc' 
			}
		})	
	}
	
	if (sort.includes('most_forked')) {
		query.orderBy.push( {
			noTimesForked: 'desc'
		})
	}
}
