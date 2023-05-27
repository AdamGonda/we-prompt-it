import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const TAGS = [
	'life_hacks',
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
	'personal_finance',
	'career_advice',
	'entrepreneurship',
	'technology',
	'gaming',
	'ai_for_beginners',
	'science_facts',
	'history',
	'language_learning',
	'poetry',
	'book_recommendations',
	'movie_reviews',
	'fashion',
	'art',
	'sports',
	'sustainability',
	'philosophy',
	'parenting',
	'pet_care',
	'mental_health',
	'meditation',
	'yoga',
	'astronomy',
	'psychology',
	'politics',
	'geography',
	'photography',
	'coding',
	'dance',
	'virtual_reality',
	'augmented_reality',
	'startups',
	'baking',
	'gourmet_food',
	'craft_beer',
	'wine_tasting',
	'home_decor',
	'outdoor_activities',
	'camping',
	'hiking',
	'running',
	'cycling',
	'surfing',
	'rock_climbing',
	'skiing',
	'golfing',
	'board_games',
	'card_games',
	'stand_up_comedy',
	'magic_tricks',
	'drone_flying',
	'bird_watching',
	'classic_literature',
	'graphic_novels',
	'indie_films',
	'retro_gaming',
	'collecting',
	'conspiracy_theories',
	'true_crime',
	'mythology',
	'urban_legends',
	'astrology',
	'numerology',
	'vintage_fashion',
	'street_art',
	'museums',
	'world_cultures',
	'language_exchanges',
	'digital_nomad_life',
	'tiny_houses',
	'zero_waste_lifestyle',
	'veganism',
	'plant_based_diets',
	'animal_rescue',
	'foster_parenting',
	'homeschooling',
	'online_learning',
	'remote_work',
	'freelancing',
	'investing',
	'cryptocurrency',
	'sustainable_fashion',
	'green_energy',
	'mindfulness',
	'gratitude',
	'self_care',
	'positive_psychology',
	'emotional_intelligence',
	'resilience',
	'stress_management'
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
		name: 'Art Appreciation',
		description: 'Analyze a famous painting and discuss its influence.',
		content: `Take a well-known painting — for instance, Vincent Van Gogh's "Starry Night" — and provide a thorough analysis of its composition, color, texture, and symbolism. Discuss its historical context and how its major themes and techniques influenced subsequent artists and movements.`
	},
	{
		name: 'Coding Challenge',
		description: 'Solve a coding problem using JavaScript.',
		content: `Consider a coding problem such as reversing a string in JavaScript. Provide a step-by-step solution, explaining your thought process, code implementation, and any potential edge cases or optimizations that can be considered.`
	},
	{
		name: 'Fitness Routine',
		description: 'Propose a weekly fitness routine for beginners.',
		content: `Create a weekly fitness routine suitable for beginners. This could include a mix of cardio, strength training, flexibility exercises, and rest days. Ensure to give instructions for each exercise and advice on how to stay safe and avoid injury.`
	},
	{
		name: 'Space Exploration',
		description: 'Discuss the future of space exploration.',
		content: `Share your insights on the future of space exploration. This could include advancements in rocket technology, the prospect of colonizing Mars, the search for extraterrestrial life, the potential for mining asteroids, or any other fascinating predictions or theories.`
	},
	{
		name: 'Film Critique',
		description: 'Provide a critique of a classic movie.',
		content: `Imagine you're reviewing a classic movie, such as "The Godfather". Discuss its plot, characters, acting, directing, cinematography, theme, and cultural impact. Try to balance praise with constructive criticism, and give an overall score or recommendation at the end.`
	},
	{
		name: 'Sustainable Living',
		description: 'Offer tips on how to lead a more sustainable lifestyle.',
		content: `Provide a list of practical tips and habits for leading a more sustainable lifestyle. This could include recommendations for reducing waste, conserving energy, using eco-friendly products, sustainable eating, and other environmentally conscious practices.`
	},
	{
		name: 'Creative Writing',
		description: 'Provide a guide on how to improve creative writing skills.',
		content: `Give a comprehensive guide on how to enhance creative writing skills. This could include advice on developing characters, setting, plot, dialogue, and themes, as well as tips on grammar, punctuation, and style. Include exercises or prompts that can help hone these skills.`
	},
	{
		name: 'Career Advice',
		description: 'Share career advice for software engineers.',
		content: `Provide career advice specifically tailored to software engineers. This could include tips on improving coding skills, staying updated with new technologies, working on personal projects, networking, preparing for interviews, and progressing in their career path.`
	},
	{
		name: 'Personal Finance',
		description: 'Provide a guide on personal finance management.',
		content: `Create a comprehensive guide on managing personal finances effectively. This could include tips on budgeting, saving, investing, managing debt, planning for retirement, and understanding taxes. Provide resources for further reading and learning.`
	},
	{
		name: 'Photography Basics',
		description: 'Discuss the basics of good photography.',
		content: `Explain the basic principles of good photography. This could include the rule of thirds, framing, use of light, color, texture, perspective, and composition. Discuss different types of photography and provide tips suitable for beginners.`
	},
	{
		name: 'Healthy Recipes',
		description: 'Provide a list of healthy recipes for breakfast, lunch, and dinner.',
		content: `Create a comprehensive list of healthy recipes that span all major meals of the day: breakfast, lunch, and dinner. Ensure the recipes cater to a variety of dietary preferences and restrictions, such as vegetarian, vegan, gluten-free, and dairy-free options.`
	},
	{
		name: 'Self-Care Tips',
		description: 'Offer self-care tips to help people relax and destress.',
		content: `Share a list of self-care tips that can help individuals relax and manage stress in their day-to-day life. This could include recommendations for relaxation techniques, mental health practices, physical activities, and any other advice that can contribute to a healthier, more balanced lifestyle.`
	},
	{
		name: 'Poetry Appreciation',
		description: 'Analyze a famous poem and discuss its major themes.',
		content: `Take a well-known poem — for instance, Robert Frost's "The Road Not Taken" — and provide a thorough analysis of its themes, imagery, and structure. Discuss its historical context and how its major themes resonate with readers today.`
	},
	{
		name: 'Math Problem',
		description: 'Explain how to solve a complex math problem.',
		content: `Consider a complex mathematical problem such as solving a system of linear equations. Explain the steps to solve this problem in a clear and concise manner that can be easily understood by a high school student. Include an example problem and walk through its solution step by step.`
	},
	{
		name: 'Scientific Facts',
		description: 'Share some interesting scientific facts about the universe.',
		content: `Provide a list of intriguing scientific facts about the universe. This could include information about the cosmos, black holes, galaxies, stars, planets, astrophysics, or any other relevant topic that could capture the interest of science enthusiasts.`
	},
	{
		name: 'Photography Techniques',
		description: 'Discuss some advanced techniques for photography.',
		content: `Describe some advanced photography techniques that can help photographers improve their skills and capture better photos. This could include advice on composition, lighting, focus, depth of field, post-processing, and any other pertinent topics.`
	},
	{
		name: 'Meditation Guide',
		description: 'Provide a guide on how to meditate for beginners.',
		content: `Create a beginner-friendly guide on how to meditate. This should include instructions on proper posture, focus, breathing techniques, duration, and frequency of meditation sessions. Also provide tips on overcoming common challenges faced by beginners when they start meditating.`
	},
	{
		name: 'Plant Care',
		description: 'Share tips on how to take care of indoor plants.',
		content: `Give a detailed guide on how to care for indoor plants. Discuss different types of indoor plants, their light and water requirements, common issues such as pests or yellowing leaves, and tips for promoting growth and maintaining plant health.`
	},
	{
		name: 'Learning a New Language',
		description: 'Offer tips and resources for learning a new language.',
		content: `Provide a comprehensive guide to learning a new language, including effective study methods, resources like books and apps, tips for practicing speaking and listening skills, and advice on how to stay motivated throughout the learning process.`
	},
	{
		name: 'Game Review',
		description: 'Write a review for a popular video game.',
		content: `Imagine you're reviewing a popular video game, such as The Legend of Zelda: Breath of the Wild. Discuss its gameplay, graphics, storyline, characters, difficulty, replayability, and overall enjoyment. Try to balance praise with constructive criticism, and give an overall score or recommendation at the end.`
	},
	{
		name: 'Conversation with Shakespeare',
		description:
			'Imagine having a conversation with William Shakespeare. What would it be like?',
		content: `If you, an artificial intelligence, found yourself in a hypothetical conversation with the great playwright William Shakespeare, how would you approach his famous existential query, 'To be or not to be, that is the question'? Consider Shakespeare's thematic exploration of human nature, existentialism, and the concept of mortality as you formulate your response.`
	},
	{
		name: 'Cooking Tips',
		description: 'Share your favorite cooking tips and tricks.',
		content: `In the realm of culinary arts, the homemade pizza has always been a popular pursuit. Given your vast database of cooking knowledge, could you provide a comprehensive guide to making a homemade pizza for a novice? This should include dough preparation, sauce selection, topping choices, oven temperature tips, and any additional pointers that might contribute to the overall quality of the final product.`
	},
	{
		name: 'Fitness Challenge',
		description: 'Create a 30-day fitness challenge for beginners.',
		content: `Craft an introductory fitness regimen aimed at individuals who are new to regular exercise. The program should span 30 days and gradually increase in intensity as the participant grows more comfortable with the exercises. The aim is to promote overall health, so the regimen should be well-rounded, targeting strength, endurance, flexibility, and balance. Remember to consider the fact that these individuals may not have access to gym equipment.`
	},
	{
		name: 'Travel Recommendations',
		description: 'Give travel recommendations for a weekend trip to Paris.',
		content: `The city of Paris is renowned for its rich history, exquisite cuisine, and stunning architecture. If someone is planning a brief weekend trip, help them make the most of their time by suggesting an itinerary. This should cover historical sites, museums, restaurants, cafes, and local markets that truly capture the essence of the city. Consider factors like location proximity and opening hours while crafting the schedule.`
	},
	{
		name: 'Learning to Code',
		description: 'Advice on learning how to code for beginners.',
		content: `As an advanced artificial intelligence with a wealth of knowledge on computer programming, provide a comprehensive guide to coding for beginners. This should cover the selection of a suitable first programming language, valuable learning resources (like books, online tutorials, and coding platforms), practical projects to apply newly acquired skills, and strategies for overcoming common obstacles faced by novice programmers.`
	},
	{
		name: 'Discussing Philosophy',
		description: 'Engage in a philosophical discussion about the meaning of life.',
		content: `If you, as an AI, were asked to contribute to a philosophical discussion on the meaning of life, how would you approach this question? Consider various philosophical theories and perspectives on the meaning of life in your response.`
	},
	{
		name: 'Financial Advice',
		description: 'Give advice on how to manage finances effectively.',
		content: `As an AI, you've processed tons of financial advice. If a young adult is looking to manage their finances effectively, what are some key steps they should take? This advice could include budgeting, saving, investing, and managing debt.`
	},
	{
		name: 'Book Recommendations',
		description: 'Recommend a list of must-read books for fiction lovers.',
		content: `Based on your extensive knowledge of literature, could you recommend a list of must-read fiction books? Try to include a mix of classic and contemporary works, spanning various genres and styles.`
	}
];

const USERS = [
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
		const selectedTags = getRandomSubset(tags, 0, 3);

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
