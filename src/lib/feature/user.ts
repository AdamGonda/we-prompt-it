import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createUser(data) {
	return await prisma.user.create({
		data
	});
}

export async function getUserByEmail(email) {
	return await prisma.user.findUnique({
		where: { email }
	});
}

export async function getDBUser(event) {
	const userEmail = (await event.locals.getSession()).user.email;
	return await getUserByEmail(userEmail);
}

export async function updateUser(id, data) {
	return await prisma.user.update({
		where: { id },
		data
	});
}

export async function deleteUser(id) {
	return await prisma.user.delete({
		where: { id }
	});
}
