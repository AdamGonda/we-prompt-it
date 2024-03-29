import '@tensorflow/tfjs-backend-cpu';
import { TensorFlowEmbeddings } from 'langchain/embeddings/tensorflow';
import fs from 'fs';
import natural from 'natural';

const RAW_PROMPTS = [
  // 0
	{
		name: 'Art Exhibition Review',
		description:
			'Critique a famous art exhibition. Analyze the presentation, curatorial decisions, artworks, and overall experience in depth.',
		content:
			"Imagine you're reviewing a renowned art exhibition like 'Van Gogh: The Immersive Experience'. Discuss the showcased artworks, delve into the themes portrayed, analyze the curation's effectiveness, and describe the overall visitor experience. Reflect on the exhibition's impact and significance. Provide both praise and constructive criticism, concluding with a recommendation for or against visiting.",
		tags: ['art', 'museums', 'culture', 'education', 'entertainment'],
		aiModel: 'RoBERTa'
	},
  // 1
	{
		name: 'Restaurant Review',
		description:
			"Provide an in-depth analysis of a well-known restaurant's offerings. Evaluate its cuisine, service, ambiance, and overall dining experience.",
		content:
			"Imagine you're critiquing a famous restaurant like 'Noma' in Copenhagen. Discuss the quality, taste, and presentation of the food. Analyze the level of service, the ambiance, the restaurant's decor, and its suitability for various dining occasions. Reflect on the price and whether it provides value for money. Provide both praise and constructive feedback, concluding with an overall rating or recommendation.",
		tags: ['gourmet-food', 'travel', 'lifestyle', 'entertainment', 'culture'],
		aiModel: 'BERT'
	},
  // 2
	{
		name: 'Travel Destination Critique',
		description:
			'Review a popular travel destination in depth. Discuss its attractions, local cuisine, culture, people, infrastructure, and overall experience.',
		content:
			"Assume you're reviewing a popular travel destination like 'Paris'. Talk about its famous attractions, local and unique cuisine, rich culture, and the experience of interacting with the locals. Explore the city's infrastructure, ease of travel, safety, and accommodations. Maintain a balanced view, providing both pros and cons. Conclude with a recommendation for potential travelers.",
		tags: ['travel', 'culture', 'outdoor-activities', 'education', 'entertainment'],
		aiModel: 'DistilBERT'
	},
  // 3
	{
		name: 'Play Review',
		description:
			'Critique a popular theatrical play. Evaluate the storyline, acting, direction, set design, music, costumes, and overall theatrical experience.',
		content:
			"Imagine you're reviewing a popular play like 'Hamlet' performed by a renowned theater group. Discuss the storyline's coherence, the performances of the actors, the director's vision, the effectiveness of the set design, the music, and the costumes. Reflect on the overall theatrical experience, the play's emotional impact, and its relevance in today's context. Provide both praise and constructive criticism, concluding with an overall recommendation.",
		tags: ['entertainment', 'education', 'music', 'culture', 'art'],
		aiModel: 'ALBERT'
	},
  // 4
	{
		name: 'Poem Analysis',
		description:
			'Conduct a deep analysis of a famous poem. Unpack its themes, investigate literary devices, scrutinize the language, and evaluate its cultural impact.',
		content:
			"You're studying 'The Road Not Taken' by Robert Frost. Analyze its key themes such as choice, regret and individualism. Examine its use of literary devices like metaphor, rhyme, and rhythm. Reflect on the specific language and its cultural or personal significance. Offer praise for its vivid imagery and universal themes, and critique its potential for misinterpretation. Provide a comprehensive interpretation based on your analysis. Conclude with an overall appraisal and personal view of the poem.",
		tags: ['education', 'poetry', 'literature', 'culture', 'language-learning'],
		aiModel: 'XLNet'
	},
  // 5
	{
		name: 'Podcast Review',
		description:
			'Provide a thorough review of a popular podcast. Discuss its content, storytelling technique, audio quality, host dynamics, and overall impact.',
		content:
			"Assume you're reviewing a popular podcast like 'Serial'. Analyze its content, the effectiveness of its storytelling, the audio quality, and the host's presentation skills. Reflect on the podcast's structure, pacing, and overall impact on the listener. Remember to provide both appreciation for the podcast's strengths and constructive feedback on areas for improvement, concluding with a recommendation for potential listeners.",
		tags: ['entertainment', 'education', 'technology', 'music', 'storytelling'],
		aiModel: 'Transformer'
	},
  // 6
	{
		name: 'Game Review',
		description:
			'Provide a detailed critique of a popular video game. Evaluate its gameplay, graphics, storyline, characters, soundtrack, and overall gaming experience.',
		content:
			"Imagine you're critiquing a popular video game like 'The Legend of Zelda: Breath of the Wild'. Discuss its gameplay mechanics, graphics quality, the depth of its story, character development, and the immersive qualities of its soundtrack. Reflect on the overall gaming experience, the game's replayability, and its innovation within the gaming industry. Offer both praise and constructive criticism, ending with an overall rating or recommendation.",
		tags: ['gaming', 'technology', 'entertainment', 'storytelling', 'education'],
		aiModel: 'OpenGPT'
	},
  // 7
	{
		name: 'Fashion Show Review',
		description:
			'Provide a thorough review of a major fashion show. Discuss the designs, themes, models, presentation, music, audience reaction, and overall impact.',
		content:
			"Assume you're reviewing a major fashion show like 'Paris Fashion Week'. Discuss the uniqueness and innovation of the designs, the thematic coherence, the models' presentation, the effectiveness of the staging, the soundtrack's suitability, and the overall impact on the audience. Provide both positive feedback and constructive criticism, concluding with an overall opinion on the show's success and influence in the fashion world.",
		tags: ['fashion', 'entertainment', 'culture', 'music', 'art'],
		aiModel: 'CTRL'
	},
  // 8
	{
		name: 'Tech Product Review',
		description:
			'Provide an in-depth critique of a new tech gadget. Discuss its features, performance, design, value for money, and the overall user experience.',
		content:
			"Imagine you're reviewing a new tech product like the 'Apple iPhone 13'. Discuss its innovative features, performance in real-world use, the aesthetic and ergonomic aspects of its design, its price point, and whether it offers value for money. Reflect on the overall user experience, including the device's software, durability, and customer support. Offer both appreciation for its strengths and constructive feedback for improvement, ending with a recommendation.",
		tags: ['technology', 'education', 'lifestyle', 'productivity', 'entertainment'],
		aiModel: 'Longformer'
	},
  // 9
	{
		name: 'Art Appreciation',
		description:
			'Analyze a famous painting in depth. Discuss its composition, symbolism, historical context, influence, and its place in art history.',
		content:
			"Consider a well-known painting — for instance, Vincent Van Gogh's 'Starry Night'. Provide a thorough analysis of its composition, color palette, texture, and symbolism. Discuss its historical context, the artist's intentions, and how its major themes and techniques influenced subsequent artists and art movements. Reflect on its impact on you personally and its enduring popularity in modern culture.",
		tags: ['art', 'history', 'culture', 'education', 'psychology'],
		aiModel: 'BERT'
	},
  // 10
	{
		name: 'Coding Challenge',
		description:
			'Solve a coding problem using JavaScript. Explain your thought process, code implementation, considerations for edge cases, and potential optimizations.',
		content:
			'Consider a coding problem such as reversing a string in JavaScript. Provide a step-by-step solution, explaining your thought process as you break down the problem, your approach to coding the solution, and any considerations for edge cases or errors. Reflect on the efficiency of the solution and discuss potential optimizations or alternative solutions.',
		tags: ['coding', 'technology', 'education', 'problem-solving', 'career-advice'],
		aiModel: 'RoBERTa'
	}
];

async function main() {
	const embeddings = new TensorFlowEmbeddings();

	const strings = promptsToStrings(RAW_PROMPTS)
	const result = await embeddings.embedDocuments(strings);

	const perExample = {
		rows: result.map((row, i) => {
			return {
				vector: row,
				ref: i
			};
		})
	};

	fs.writeFile('my-data.json', JSON.stringify(perExample, null, 2), (err) => {
		if (err) throw err;
		console.log('Data written to file');
	});
}

function promptsToStrings(rawPrompts){
  return rawPrompts.map((prompt) => {
    const rawString = `${prompt.name} ${prompt.description} ${prompt.content} ${prompt.tags.join(' ')}`;
    return getCleanText(rawString);
  });
}

function getCleanText(text) {
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

async function query(q) {
	const embeddings = new TensorFlowEmbeddings();
	const result = await embeddings.embedQuery(getCleanText(q));

	fs.writeFile('query.json', JSON.stringify(result, null, 4), (err) => {
		if (err) throw err;
		console.log('Data written to file');
	});

	// console.log('log result', result);
}


// main();
// query('Art Exhibition Review')  // 0, 9, 7, 3, 6
// query('give me some art stuff') // 0, 9, 3, 4, 6