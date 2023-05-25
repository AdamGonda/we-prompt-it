import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const r = await prisma.prompt.findMany({
		where: {
			content: {
				search: 'happens',
			}
		}
	});

	console.log('log r', r)
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
