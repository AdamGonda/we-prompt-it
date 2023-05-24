import { PrismaClient } from '@prisma/client';
import { getDBUser } from './shared';

const prisma = new PrismaClient();

export async function addRemoveLike(event) {
	const id = event.url.searchParams.get('id');
	const session = await event.locals.getSession();
	const user = await getDBUser(event);
	const userId = user.id;
	const repoId = Number(id);

	if (!id || !session.user) {
		return new Response(JSON.stringify({ status: 400 }));
	}

	// check if user already liked the repo before
	const likeInDB = await prisma.like.findUnique({
		where: {
			userId_repoId: { userId, repoId }
		}
	});

	// if not create new like
	if (!likeInDB) {
		await prisma.like.create({
			data: {
				userId,
				repoId
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
