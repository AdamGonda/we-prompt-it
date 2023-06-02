import { getDBUser } from '$lib/controllers/shared';
import { error, json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import globalIncludes from '$lib/global-includes';
import natural from 'natural';
import { convertToSlug } from '$lib/utils';

const prisma = new PrismaClient();

export async function addRemoveLike(event) {
	const id = event.url.searchParams.get('id');
	const session = await event.locals.getSession();
	const user = await getDBUser(event);
	const userId = user.id;
	const promptId = Number(id);

	if (!id || !session.user) {
		return new Response(JSON.stringify({ status: 400 }));
	}

	// check if user already liked the prompt before
	const likeInDB = await prisma.like.findUnique({
		where: {
			userId_promptId: { userId, promptId }
		}
	});

	// if not create new like
	if (!likeInDB) {
		await prisma.like.create({
			data: {
				userId,
				promptId
			}
		});

		return new Response(JSON.stringify({ status: 200, diff: 1 }));
	}

	// if yes based on isDeleted, reactivate or delete
	if (likeInDB.isDeleted) {
		await prisma.like.update({
			where: {
				id: likeInDB.id
			},
			data: {
				isDeleted: false
			}
		});
		return new Response(JSON.stringify({ status: 200, diff: 1 }));
	} else {
		await prisma.like.update({
			where: {
				id: likeInDB.id
			},
			data: {
				isDeleted: true
			}
		});
		return new Response(JSON.stringify({ status: 200, diff: -1 }));
	}
}

export async function nameCheck(event) {
	const proposedName = event.url.searchParams.get('proposedName');
	const promptId = event.url.searchParams.get('promptId');
	const user = await getDBUser(event);

	if (!proposedName) {
		throw error(400, {
			message: `Missing parameters`
		});
	}

	const existingPrompt = await prisma.prompt.findFirst({
		where: {
			slug: convertToSlug(user.username, proposedName),
			authorId: user.id,
			isDeleted: false
		}
	});

	// If promptId is null or undefined, this is a new prompt.
	if (!promptId) {
		return existingPrompt ? json({ ok: false }) : json({ ok: true });
	} else {
		// If promptId exists and the found prompt is not the same as the one being updated.
		if (existingPrompt && existingPrompt.id !== Number(promptId)) {
			return json({ ok: false });
		}

		return json({ ok: true });
	}
}

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
	return json(await _search(event));
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

function _handlePagination(query, event) {
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

	let search = getCleanText(text);

	if (search.includes(' ')) {
		search = search.split(' ').join(' | ');
	}

	const fulltextSearch = {
		fulltext: {
			search
		}
	};

	if (text) {
		query.where.OR = [fulltextSearch];
	}
}

function _handleTags(query, event) {
	const tags = event.url.searchParams.getAll('tag');

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

export function getCleanText(text) {
	const tokenizer = new natural.WordPunctTokenizer();

	const stopWords = [
		'a',
		'about',
		'above',
		'after',
		'again',
		'against',
		'all',
		'am',
		'an',
		'and',
		'any',
		'are',
		'as',
		'at',
		'be',
		'because',
		'been',
		'before',
		'being',
		'below',
		'between',
		'both',
		'but',
		'by',
		'can',
		'could',
		'did',
		'do',
		'does',
		'doing',
		'down',
		'during',
		'each',
		'few',
		'for',
		'from',
		'further',
		'had',
		'has',
		'have',
		'having',
		'he',
		'her',
		'here',
		'hers',
		'herself',
		'him',
		'himself',
		'his',
		'how',
		'i',
		'if',
		'in',
		'into',
		'is',
		'it',
		'its',
		'itself',
		'me',
		'more',
		'most',
		'my',
		'myself',
		'no',
		'nor',
		'not',
		'of',
		'off',
		'on',
		'once',
		'only',
		'or',
		'other',
		'ought',
		'our',
		'ours',
		'ourselves',
		'out',
		'over',
		'own',
		'same',
		'she',
		'should',
		'so',
		'some',
		'such',
		'than',
		'that',
		'the',
		'their',
		'theirs',
		'them',
		'themselves',
		'then',
		'there',
		'these',
		'they',
		'this',
		'those',
		'through',
		'to',
		'too',
		'under',
		'until',
		'up',
		'very',
		'was',
		'we',
		'were',
		'what',
		'when',
		'where',
		'which',
		'while',
		'who',
		'whom',
		'why',
		'will',
		'with',
		'you',
		'your',
		'yours',
		'yourself',
		'yourselves'
	];

	// Lowercase the text
	text = text.toLowerCase();

	// Remove punctuation
	text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

	// Remove extra whitespace and trim leading and trailing whitespaces
	text = text.replace(/\s{2,}/g, ' ').trim();

	// Tokenization
	let tokens = tokenizer.tokenize(text);

	// Remove stop words
	tokens = tokens.filter((token) => !stopWords.includes(token));

	// Remove numbers - this will remove all tokens that are entirely numeric
	tokens = tokens.filter((token) => !token.match(/^[0-9]+$/));

	// Stemming - using Porter's stemming algorithm
	tokens = tokens.map((token) => natural.PorterStemmer.stem(token));

	return tokens.join(' ');
}

export function promptToString(prompt) {
	const rawString = `${prompt.name} ${prompt.description} ${
		prompt.content
	} ${prompt.tags.join(' ')} ${prompt.aiModel.name}`;
	return getCleanText(rawString);
}