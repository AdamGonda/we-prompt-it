import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email) {
	return await prisma.user.findUnique({
		where: { email }
	});
}

export async function getDBUser(event) {
	const userEmail = (await event.locals.getSession()).user.email;
	return await getUserByEmail(userEmail);
}
