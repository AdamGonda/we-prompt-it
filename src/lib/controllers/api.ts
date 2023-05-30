import { getDBUser } from '$lib/controllers/shared';
import { error, json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { convertToSlug } from '$lib/utils';
import { _search } from './loders';

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
			authorId: user.id
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
