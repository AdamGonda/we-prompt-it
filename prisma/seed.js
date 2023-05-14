import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const testUser1 = await prisma.user.upsert({
		where: { email: 'adamgondagyula@gmail.com' },
		update: {},
		create: {
			firstName: 'Adam',
			lastName: 'Gonda',
			email: 'adamgondagyula@gmail.com'
			
		}
	});

	const testUser2 = await prisma.user.upsert({
		where: { email: 'testshareloop1@gmail.com' },
		update: {},
		create: {
			firstName: 'test1 f',
			lastName: 'test1 l',
			email: 'testshareloop1@gmail.com'
		}
	});

	const testUser3 = await prisma.user.upsert({
		where: { email: 'testshareloop2@gmail.com' },
		update: {},
		create: {
			firstName: 'test2 f',
			lastName: 'test2 l',
			email: 'testshareloop2@gmail.com'
		}
	});

	
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
