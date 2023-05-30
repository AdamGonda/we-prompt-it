import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const TAGS = [
	'life-hacks',
	'motivation',
	'productivity',
	'entertainment',
	'humor',
	'education',
	'music',
	'travel',
	'health',
	'fitness',
	'nutrition',
	'diy',
	'gardening',
	'cooking',
	'relationships',
	'personal-finance',
	'career-advice',
	'entrepreneurship',
	'technology',
	'gaming',
	'ai-for-beginners',
	'science-facts',
	'history',
	'language-learning',
	'poetry',
	'book-recommendations',
	'movie-reviews',
	'fashion',
	'art',
	'sports',
	'sustainability',
	'philosophy',
	'parenting',
	'pet-care',
	'mental-health',
	'meditation',
	'yoga',
	'astronomy',
	'psychology',
	'politics',
	'geography',
	'photography',
	'coding',
	'dance',
	'virtual-reality',
	'augmented-reality',
	'startups',
	'baking',
	'gourmet-food',
	'craft-beer',
	'wine-tasting',
	'home-decor',
	'outdoor-activities',
	'camping',
	'hiking',
	'running',
	'cycling',
	'surfing',
	'rock-climbing',
	'skiing',
	'golfing',
	'board-games',
	'card-games',
	'stand-up-comedy',
	'magic-tricks',
	'drone-flying',
	'bird-watching',
	'classic-literature',
	'graphic-novels',
	'indie-films',
	'retro-gaming',
	'collecting',
	'conspiracy-theories',
	'true-crime',
	'mythology',
	'urban-legends',
	'astrology',
	'numerology',
	'vintage-fashion',
	'street-art',
	'museums',
	'world-cultures',
	'language-exchanges',
	'digital-nomad-life',
	'tiny-houses',
	'zero-waste-lifestyle',
	'veganism',
	'plant-based-diets',
	'animal-rescue',
	'foster-parenting',
	'homeschooling',
	'online-learning',
	'remote-work',
	'freelancing',
	'investing',
	'cryptocurrency',
	'sustainable-fashion',
	'green-energy',
	'mindfulness',
	'gratitude',
	'self-care',
	'positive-psychology',
	'emotional-intelligence',
	'resilience',
	'stress-management'
];

const AI_MODELS = [
	'DistilBERT',
	'XLNet',
	'MobileBERT',
	'BERT',
	'Longformer',
	'CTRL',
	'MPNet',
	'OpenGPT',
	'ChatGPT',
	'GPT',
	'RoBERTa',
	'Transformer',
	'TinyBERT',
	'XLM',
	'T5',
	'ALBERT'
];

const PROMPTS = [
	{
		name: 'Art Exhibition Review',
		description:
			'Critique a famous art exhibition. Analyze the presentation, curatorial decisions, artworks, and overall experience in depth.',
		content:
			"Imagine you're reviewing a renowned art exhibition like 'Van Gogh: The Immersive Experience'. Discuss the showcased artworks, delve into the themes portrayed, analyze the curation's effectiveness, and describe the overall visitor experience. Reflect on the exhibition's impact and significance. Provide both praise and constructive criticism, concluding with a recommendation for or against visiting."
	},
	{
		name: 'Restaurant Review',
		description:
			"Provide an in-depth analysis of a well-known restaurant's offerings. Evaluate its cuisine, service, ambiance, and overall dining experience.",
		content:
			"Imagine you're critiquing a famous restaurant like 'Noma' in Copenhagen. Discuss the quality, taste, and presentation of the food. Analyze the level of service, the ambiance, the restaurant's decor, and its suitability for various dining occasions. Reflect on the price and whether it provides value for money. Provide both praise and constructive feedback, concluding with an overall rating or recommendation."
	},
	{
		name: 'Travel Destination Critique',
		description:
			'Review a popular travel destination in depth. Discuss its attractions, local cuisine, culture, people, infrastructure, and overall experience.',
		content:
			"Assume you're reviewing a popular travel destination like 'Paris'. Talk about its famous attractions, local and unique cuisine, rich culture, and the experience of interacting with the locals. Explore the city's infrastructure, ease of travel, safety, and accommodations. Maintain a balanced view, providing both pros and cons. Conclude with a recommendation for potential travelers."
	},
	{
		name: 'Play Review',
		description:
			'Critique a popular theatrical play. Evaluate the storyline, acting, direction, set design, music, costumes, and overall theatrical experience.',
		content:
			"Imagine you're reviewing a popular play like 'Hamlet' performed by a renowned theater group. Discuss the storyline's coherence, the performances of the actors, the director's vision, the effectiveness of the set design, the music, and the costumes. Reflect on the overall theatrical experience, the play's emotional impact, and its relevance in today's context. Provide both praise and constructive criticism, concluding with an overall recommendation."
	},
	{
		name: 'Poem Analysis',
		description:
			'Conduct a deep analysis of a famous poem. Unpack its themes, investigate literary devices, scrutinize the language, and evaluate its cultural impact.',
		content:
			"You're studying 'The Road Not Taken' by Robert Frost. Analyze its key themes such as choice, regret and individualism. Examine its use of literary devices like metaphor, rhyme, and rhythm. Reflect on the specific language and its cultural or personal significance. Offer praise for its vivid imagery and universal themes, and critique its potential for misinterpretation. Provide a comprehensive interpretation based on your analysis. Conclude with an overall appraisal and personal view of the poem."
	},
	{
		name: 'Podcast Review',
		description:
			'Provide a thorough review of a popular podcast. Discuss its content, storytelling technique, audio quality, host dynamics, and overall impact.',
		content:
			"Assume you're reviewing a popular podcast like 'Serial'. Analyze its content, the effectiveness of its storytelling, the audio quality, and the host's presentation skills. Reflect on the podcast's structure, pacing, and overall impact on the listener. Remember to provide both appreciation for the podcast's strengths and constructive feedback on areas for improvement, concluding with a recommendation for potential listeners."
	},
	{
		name: 'Game Review',
		description:
			'Provide a detailed critique of a popular video game. Evaluate its gameplay, graphics, storyline, characters, soundtrack, and overall gaming experience.',
		content:
			"Imagine you're critiquing a popular video game like 'The Legend of Zelda: Breath of the Wild'. Discuss its gameplay mechanics, graphics quality, the depth of its story, character development, and the immersive qualities of its soundtrack. Reflect on the overall gaming experience, the game's replayability, and its innovation within the gaming industry. Offer both praise and constructive criticism, ending with an overall rating or recommendation."
	},
	{
		name: 'Fashion Show Review',
		description:
			'Provide a thorough review of a major fashion show. Discuss the designs, themes, models, presentation, music, audience reaction, and overall impact.',
		content:
			"Assume you're reviewing a major fashion show like 'Paris Fashion Week'. Discuss the uniqueness and innovation of the designs, the thematic coherence, the models' presentation, the effectiveness of the staging, the soundtrack's suitability, and the overall impact on the audience. Provide both positive feedback and constructive criticism, concluding with an overall opinion on the show's success and influence in the fashion world."
	},
	{
		name: 'Tech Product Review',
		description:
			'Provide an in-depth critique of a new tech gadget. Discuss its features, performance, design, value for money, and the overall user experience.',
		content:
			"Imagine you're reviewing a new tech product like the 'Apple iPhone 13'. Discuss its innovative features, performance in real-world use, the aesthetic and ergonomic aspects of its design, its price point, and whether it offers value for money. Reflect on the overall user experience, including the device's software, durability, and customer support. Offer both appreciation for its strengths and constructive feedback for improvement, ending with a recommendation."
	},
	{
		name: 'Art Appreciation',
		description:
			'Analyze a famous painting in depth. Discuss its composition, symbolism, historical context, influence, and its place in art history.',
		content: `Consider a well-known painting — for instance, Vincent Van Gogh's "Starry Night". Provide a thorough analysis of its composition, color palette, texture, and symbolism. Discuss its historical context, the artist's intentions, and how its major themes and techniques influenced subsequent artists and art movements. Reflect on its impact on you personally and its enduring popularity in modern culture.`
	},
	{
		name: 'Coding Challenge',
		description:
			'Solve a coding problem using JavaScript. Explain your thought process, code implementation, considerations for edge cases, and potential optimizations.',
		content: `Consider a coding problem such as reversing a string in JavaScript. Provide a step-by-step solution, explaining your thought process as you break down the problem, your approach to coding the solution, and any considerations for edge cases or errors. Reflect on the efficiency of the solution and discuss potential optimizations or alternative solutions.`
	}
];

const USERS = [
	{
		firstName: 'Oliver',
		lastName: 'Reid',
		username: 'oliverReid',
		email: 'oliverReid@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/23.jpg'
	},
	{
		firstName: 'Chloe',
		lastName: 'Ball',
		username: 'chloeBall',
		email: 'chloeBall@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/40.jpg'
	},
	{
		firstName: 'Ethan',
		lastName: 'Riley',
		username: 'ethanRiley',
		email: 'ethanRiley@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/80.jpg'
	},
	{
		firstName: 'Sophia',
		lastName: 'Williamson',
		username: 'sophiaWilliamson',
		email: 'sophiaWilliamson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/95.jpg'
	},
	{
		firstName: 'Jack',
		lastName: 'Patterson',
		username: 'jackPatterson',
		email: 'jackPatterson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/46.jpg'
	},
	{
		firstName: 'Isabelle',
		lastName: 'Ellis',
		username: 'isabelleEllis',
		email: 'isabelleEllis@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/36.jpg'
	},
	{
		firstName: 'William',
		lastName: 'Murphy',
		username: 'williamMurphy',
		email: 'williamMurphy@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/37.jpg'
	},
	{
		firstName: 'Emma',
		lastName: 'Simpson',
		username: 'emmaSimpson',
		email: 'emmaSimpson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/77.jpg'
	},
	{
		firstName: 'Noah',
		lastName: 'Marshall',
		username: 'noahMarshall',
		email: 'noahMarshall@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/58.jpg'
	},
	{
		firstName: 'Ava',
		lastName: 'Holmes',
		username: 'avaHolmes',
		email: 'avaHolmes@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/8.jpg'
	},
	{
		firstName: 'Liam',
		lastName: 'Knight',
		username: 'liamKnight',
		email: 'liamKnight@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/7.jpg'
	},
	{
		firstName: 'Mia',
		lastName: 'Gibson',
		username: 'miaGibson',
		email: 'miaGibson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/9.jpg'
	},
	{
		firstName: 'James',
		lastName: 'Freeman',
		username: 'jamesFreeman',
		email: 'jamesFreeman@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/49.jpg'
	},
	{
		firstName: 'Lily',
		lastName: 'Duncan',
		username: 'lilyDuncan',
		email: 'lilyDuncan@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/10.jpg'
	},
	{
		firstName: 'Michael',
		lastName: 'Rose',
		username: 'michaelRose',
		email: 'michaelRose@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/11.jpg'
	},
	{
		firstName: 'Madison',
		lastName: 'Boyd',
		username: 'madisonBoyd',
		email: 'madisonBoyd@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/12.jpg'
	},
	{
		firstName: 'Daniel',
		lastName: 'Morris',
		username: 'danielMorris',
		email: 'danielMorris@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/13.jpg'
	},
	{
		firstName: 'Sophie',
		lastName: 'Grant',
		username: 'sophieGrant',
		email: 'sophieGrant@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/14.jpg'
	},
	{
		firstName: 'Aiden',
		lastName: 'Mason',
		username: 'aidenMason',
		email: 'aidenMason@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/15.jpg'
	},
	{
		firstName: 'Ella',
		lastName: 'Graham',
		username: 'ellaGraham',
		email: 'ellaGraham@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/16.jpg'
	},
	{
		firstName: 'Adam',
		lastName: 'Gonda',
		username: 'adamgonda',
		email: 'adamgondagyula@gmail.com',
		picture:
			'https://media.licdn.com/dms/image/D4D03AQGP2Uqp_BckfA/profile-displayphoto-shrink_800_800/0/1671748473242?e=2147483647&v=beta&t=FisqNTE1LPZ6lCsaITUOg7jg5DdhE5v9eAJJKnBl930'
	},
	{
		firstName: 'Lillian',
		lastName: 'Newton',
		username: 'mormota',
		email: 'testshareloop1@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/6.jpg'
	},
	{
		firstName: 'Cynthia',
		lastName: 'Fisher',
		username: 'fabriko',
		email: 'testshareloop2@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/5.jpg'
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		username: 'johndoe',
		email: 'johndoe@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/45.jpg'
	},
	{
		firstName: 'Jane',
		lastName: 'Doe',
		username: 'janedoe',
		email: 'janedoe@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/78.jpg'
	},
	{
		firstName: 'Emma',
		lastName: 'Brown',
		username: 'emmabrown',
		email: 'emmabrown@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/56.jpg'
	},
	{
		firstName: 'James',
		lastName: 'Smith',
		username: 'jamessmith',
		email: 'jamessmith@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/98.jpg'
	},
	{
		firstName: 'Alice',
		lastName: 'Johnson',
		username: 'alicejohnson',
		email: 'alicejohnson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/12.jpg'
	},
	{
		firstName: 'Bob',
		lastName: 'Thompson',
		username: 'bobthompson',
		email: 'bobthompson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/34.jpg'
	},
	{
		firstName: 'Charlotte',
		lastName: 'Robinson',
		username: 'charlotterobinson',
		email: 'charlotterobinson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/56.jpg'
	},
	{
		firstName: 'David',
		lastName: 'Clark',
		username: 'davidclark',
		email: 'davidclark@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/78.jpg'
	},
	{
		firstName: 'Emily',
		lastName: 'Mitchell',
		username: 'emilymitchell',
		email: 'emilymitchell@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/90.jpg'
	},
	{
		firstName: 'Frank',
		lastName: 'Anderson',
		username: 'frankanderson',
		email: 'frankanderson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/21.jpg'
	},
	{
		firstName: 'Grace',
		lastName: 'Taylor',
		username: 'gracetaylor',
		email: 'gracetaylor@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/43.jpg'
	},
	{
		firstName: 'Henry',
		lastName: 'White',
		username: 'henrywhite',
		email: 'henrywhite@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/65.jpg'
	},
	{
		firstName: 'Isabella',
		lastName: 'Harris',
		username: 'isabellaharris',
		email: 'isabellaharris@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/87.jpg'
	},
	{
		firstName: 'Jacob',
		lastName: 'Davis',
		username: 'jacobdavis',
		email: 'jacobdavis@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/9.jpg'
	},
	{
		firstName: 'Carl',
		lastName: 'Wagner',
		username: 'turboSpeed',
		email: 'carlWagner@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/31.jpg'
	},
	{
		firstName: 'Emma',
		lastName: 'Dobson',
		username: 'emmaDob',
		email: 'emmaDobson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/22.jpg'
	},
	{
		firstName: 'Oscar',
		lastName: 'Howard',
		username: 'oscarTheGrouch',
		email: 'oscarHoward@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/18.jpg'
	},
	{
		firstName: 'Laura',
		lastName: 'Harper',
		username: 'lauraHarp',
		email: 'lauraHarper@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/89.jpg'
	},
	{
		firstName: 'Paul',
		lastName: 'Martin',
		username: 'paulMartini',
		email: 'paulMartin@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/44.jpg'
	},
	{
		firstName: 'Emily',
		lastName: 'Cook',
		username: 'cookieMonster',
		email: 'emilyCook@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/35.jpg'
	},
	{
		firstName: 'George',
		lastName: 'Crawford',
		username: 'georgeCraw',
		email: 'georgeCrawford@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/68.jpg'
	},
	{
		firstName: 'Amelia',
		lastName: 'Morrison',
		username: 'ameliMorr',
		email: 'ameliaMorrison@gmail.com',
		picture: 'https://randomuser.me/api/portraits/women/17.jpg'
	},
	{
		firstName: 'John',
		lastName: 'Atkinson',
		username: 'johnA',
		email: 'johnAtkinson@gmail.com',
		picture: 'https://randomuser.me/api/portraits/men/99.jpg'
	}
];

// get users
async function getUsers() {
	const users = USERS.map(async (user) => {
		return await prisma.user.create({
			data: {
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				email: user.email,
				picture: user.picture
			}
		});
	});

	return await Promise.all(users);
}

async function getAiModels() {
	const models = AI_MODELS.map(async (model) => {
		return await prisma.aiModel.create({
			data: {
				name: model,
				link: 'https://chat.openai.com/'
			}
		});
	});
	return await Promise.all(models);
}

async function getTags() {
	const tags = TAGS.map(async (tag) => {
		return await prisma.tag.create({
			data: {
				name: tag
			}
		});
	});
	return await Promise.all(tags);
}

async function main() {
	// Get the arrays of users, AI models, and tags
	const users = await getUsers();
	const aiModels = await getAiModels();
	const tags = await getTags();

	// Function to get a random element from an array
	const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

	// Function to get a random subset of an array
	const getRandomSubset = (array, minLen, maxLen) => {
		const shuffled = array.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen);
	};

	// Function to get a random number between two values
	const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	// Iterate over each item in the PROMPTS array
	for (const prompt of PROMPTS) {
		// Randomly select an AI model, an author, and some tags
		const aiModel = getRandomElement(aiModels);
		const author = getRandomElement(users);
		const selectedTags = getRandomSubset(tags, 2, 5);

		// Randomly select some users to like the prompt
		const likers = getRandomSubset(users, 1, users.length);

		// Randomly select forkedCount
		const forkedCount = getRandomNumber(1, 1000);

		// Create the prompt
		await prisma.prompt.create({
			data: {
				name: prompt.name,
				description: prompt.description,
				content: prompt.content,
				slug: prompt.name.toLowerCase().replace(/\s/g, '-'),
				author: {
					connect: {
						id: author.id
					}
				},
				aiModel: {
					connect: {
						id: aiModel.id
					}
				},
				tags: {
					connect: selectedTags.map((tag) => ({ id: tag.id }))
				},
				likes: {
					create: likers.map((user) => ({ userId: user.id }))
				},
				forkedCount: forkedCount
			}
		});
	}
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
