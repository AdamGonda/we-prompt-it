import { PrismaClient } from '@prisma/client';
import { getDBUser } from './shared';

const prisma = new PrismaClient();

export async function addRemoveStar(event) {
	const id = event.url.searchParams.get('id');
	const session = await event.locals.getSession();
	const user = await getDBUser(event);
	const userId = user.id;
	const repoId = Number(id);

	if (!id || !session.user) {
		return new Response(JSON.stringify({ status: 400 }));
	}

	// check if user already starred the repo before
	const starInDB = await prisma.star.findUnique({
		where: {
			userId_repoId: { userId, repoId }
		}
	});

	// if not create new star
	if (!starInDB) {
		await prisma.star.create({
			data: {
				userId,
				repoId
			}
		});

		await prisma.repo.update({
			where: {
				id: repoId
			},
			data: {
				likeCount: {
					increment: 1
				}
			}
		});

		return new Response(JSON.stringify({ status: 200, diff: 1 }));
	}

	// if yes based on isDeleted, reactivate or delete
	if (starInDB.isDeleted) {
		await prisma.star.update({
			where: {
				id: starInDB.id
			},
			data: {
				isDeleted: false
			}
		});

		await prisma.repo.update({
			where: {
				id: repoId
			},
			data: {
				likeCount: {
					increment: 1
				}
			}
		});
		return new Response(JSON.stringify({ status: 200, diff: 1 }));
	} else {
		await prisma.star.update({
			where: {
				id: starInDB.id
			},
			data: {
				isDeleted: true
			}
		});

		await prisma.repo.update({
			where: {
				id: repoId
			},
			data: {
				likeCount: {
					increment: -1
				}
			}
		});
		return new Response(JSON.stringify({ status: 200, diff: -1 }));
	}
}
