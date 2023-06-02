import { error } from '@sveltejs/kit';
import { promptSchema, type PromptSchema } from './yup-schemas';
import natural from 'natural';

export function formDataToObject(formData) {
	const formValues = {};
	for (const [key, value] of formData.entries()) {
		if (value === '') {
			formValues[key] = value;
		} else if (!isNaN(value) && key !== 'tags') {
			formValues[key] = Number(value);
		} else {
			formValues[key] = value;
		}
	}
	return formValues;
}

export async function validateForm(event): Promise<PromptSchema> {
	const formData = formDataToObject(await event.request.formData());
	const errors = {};

	try {
		promptSchema.validateSync(formData, { abortEarly: false });
	} catch (error) {
		error.inner.forEach((err) => {
			errors[err.path] = err.errors[0];
		});
	}

	if (Object.keys(errors).length > 0) {
		throw error(400, JSON.stringify(errors));
	}

	return formData;
}

export function convertToSlug(username, text) {
	return username + '-' + text.toLowerCase().replace(/ /g, '-');
}

export function getCleanText(text) {
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

export function promptToString(prompt) {
	const rawString = `${prompt.name} ${prompt.description} ${
		prompt.content
	} ${prompt.tags.join(' ')} ${prompt.aiModel.name}`;
	return getCleanText(rawString);
}
