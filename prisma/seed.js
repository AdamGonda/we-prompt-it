import { PrismaClient } from '@prisma/client';
import natural from 'natural';
const prisma = new PrismaClient();

const RAW_PROMPTS = [
	// 0
	{
		name: 'Art Exhibition',
		description:
			'Critique a famous art exhibition. Analyze the presentation, curatorial decisions, artworks, and overall experience in depth.',
		content:
			"Imagine you're reviewing a renowned art exhibition like 'Van Gogh: The Immersive Experience'. Discuss the showcased artworks, delve into the themes portrayed, analyze the curation's effectiveness, and describe the overall visitor experience. Reflect on the exhibition's impact and significance. Provide both praise and constructive criticism, concluding with a recommendation for or against visiting.",
		tags: ['art', 'museums', 'culture', 'education', 'entertainment'],
		aiModel: 'RoBERTa'
	},
	// 1
	{
		name: 'Restaurant',
		description:
			"Provide an in-depth analysis of a well-known restaurant's offerings. Evaluate its cuisine, service, ambiance, and overall dining experience.",
		content:
			"Imagine you're critiquing a famous restaurant like 'Noma' in Copenhagen. Discuss the quality, taste, and presentation of the food. Analyze the level of service, the ambiance, the restaurant's decor, and its suitability for various dining occasions. Reflect on the price and whether it provides value for money. Provide both praise and constructive feedback, concluding with an overall rating or recommendation.",
		tags: ['gourmet-food', 'travel', 'lifestyle', 'entertainment', 'culture'],
		aiModel: 'BERT'
	},
	// 2
	{
		name: 'Travel Destination',
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
		name: 'Fashion Show',
		description:
			'Provide a thorough review of a major fashion show. Discuss the designs, themes, models, presentation, music, audience reaction, and overall impact.',
		content:
			"Assume you're reviewing a major fashion show like 'Paris Fashion Week'. Discuss the uniqueness and innovation of the designs, the thematic coherence, the models' presentation, the effectiveness of the staging, the soundtrack's suitability, and the overall impact on the audience. Provide both positive feedback and constructive criticism, concluding with an overall opinion on the show's success and influence in the fashion world.",
		tags: ['fashion', 'entertainment', 'culture', 'music', 'art'],
		aiModel: 'CTRL'
	},
	// 8
	{
		name: 'Tech Product',
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
	},
	// 11
	{
		name: 'Understanding Quantum Physics',
		description:
			'Discuss the principles of Quantum Physics. Provide examples and explain their implications in the real world.',
		content:
			'Consider concepts such as superposition and quantum entanglement. Discuss their theoretical foundations and their implications in technology and the real world. Reflect on how they challenge our intuitive understanding of reality.',
		tags: ['science', 'physics', 'education', 'quantum-physics'],
		aiModel: 'BERT'
	},
	// 12
	{
		name: 'Data Analysis with Python',
		description:
			'Analyze a dataset using Python. Explain the process, techniques used, insights derived, and potential applications.',
		content:
			'Consider a dataset, like a customer database. Explain how you would load the data using pandas, clean and preprocess it, analyze it using appropriate techniques, and derive insights from it. Discuss potential applications of these insights in a business context.',
		tags: ['coding', 'data-science', 'education', 'python', 'pandas'],
		aiModel: 'RoBERTa'
	},
	// 13
	{
		name: 'Philosophy of Ethics',
		description:
			'Discuss an ethical theory in depth. Explain its principles, criticisms, and practical applications.',
		content:
			'Consider a theory like utilitarianism. Discuss its core principles, potential criticisms, and how it can be applied in real-world ethical dilemmas. Reflect on its influence in philosophy and modern society.',
		tags: ['philosophy', 'ethics', 'education', 'humanities'],
		aiModel: 'BERT'
	},
	// 14
	{
		name: 'Web Development with React',
		description:
			'Build a simple web application using React. Explain the steps, code implementation, and decisions made during the process.',
		content:
			'Consider building a simple todo list application with React. Explain the creation of components, state management, and handling user input. Reflect on the choices made during the development process, potential optimizations, and alternate approaches.',
		tags: ['coding', 'web-development', 'react', 'javascript', 'education'],
		aiModel: 'RoBERTa'
	},
	// 15
	{
		name: 'Economic Principles',
		description:
			'Discuss a key principle in economics. Explain its theory, real-world applications, and implications.',
		content:
			'Consider the principle of supply and demand. Discuss its theoretical foundations, real-world examples, and its implications in various economic situations. Reflect on how it informs our understanding of markets and economic behavior.',
		tags: ['economics', 'education', 'finance', 'social-science'],
		aiModel: 'BERT'
	},
	// 16
	{
		name: 'Building a Mobile App with Flutter',
		description:
			'Build a simple mobile app using Flutter. Discuss the steps, code implementation, and considerations made during the process.',
		content:
			'Consider creating a basic weather app with Flutter. Explain the creation of widgets, state management, and handling user interactions. Reflect on the choices made during the development process, potential optimizations, and alternate approaches.',
		tags: ['coding', 'mobile-development', 'flutter', 'dart', 'education'],
		aiModel: 'RoBERTa'
	},
	// 17
	{
		name: 'Psychology of Learning',
		description:
			'Discuss a theory about how people learn. Explain its principles, examples, and applications in educational settings.',
		content:
			'Consider a theory such as the Zone of Proximal Development by Vygotsky. Discuss its main ideas, provide examples of its application, and reflect on its significance in understanding student learning and designing effective instruction.',
		tags: ['psychology', 'education', 'learning-theory', 'humanities'],
		aiModel: 'BERT'
	},
	// 18
	{
		name: 'Machine Learning with Scikit-Learn',
		description:
			'Build a simple machine learning model using Scikit-Learn. Discuss the process, code implementation, and performance evaluation.',
		content:
			'Consider creating a simple linear regression model with Scikit-Learn. Discuss the data preprocessing steps, the model creation and training process, prediction and evaluation of the model. Reflect on the choices made during the process, potential improvements, and alternate approaches.',
		tags: ['coding', 'machine-learning', 'scikit-learn', 'python', 'education'],
		aiModel: 'RoBERTa'
	},
	// 19
	{
		name: 'Climate Change Effects',
		description:
			'Discuss the effects of climate change on a specific ecosystem. Explain the impacts, adaptations, and implications for the future.',
		content:
			'Consider an ecosystem like the Arctic tundra. Discuss the impacts of climate change on its flora and fauna, any observable adaptations, and potential future scenarios under continued climate change. Reflect on the global implications and the importance of mitigating climate change.',
		tags: ['climate-change', 'science', 'education', 'ecology', 'environment'],
		aiModel: 'BERT'
	},
	// 20
	{
		name: 'Building REST API with Node.js',
		description:
			'Build a simple REST API using Node.js. Discuss the process, code implementation, and testing methods.',
		content:
			'Consider creating a basic REST API for a book store with Node.js and Express. Explain the creation of endpoints, request handling, and database interactions. Discuss the methods for testing the API and reflect on the choices made during the development process, potential optimizations, and alternate approaches.',
		tags: ['coding', 'web-development', 'node.js', 'rest-api', 'education'],
		aiModel: 'RoBERTa'
	},
	// 21
	{
		name: 'Exploring the Universe',
		description:
			'Discuss the mysteries and recent discoveries about the Universe. Explain theories, evidences, and implications.',
		content:
			'Consider the mysteries like dark matter and energy, or recent discoveries about black holes. Discuss the theories, evidence supporting them, and their implications for our understanding of the universe.',
		tags: ['science', 'astronomy', 'education', 'space'],
		aiModel: 'BERT'
	},
	// 22
	{
		name: 'Creating Interactive Visualizations with D3.js',
		description:
			'Create a data visualization using D3.js. Discuss the process, code implementation, and data interpretation.',
		content:
			'Consider creating an interactive bar chart with D3.js. Discuss data preparation, creation of scales and axes, rendering of bars, and adding interactivity. Reflect on how the visualization helps interpret the data and potential improvements.',
		tags: ['coding', 'data-visualization', 'd3.js', 'javascript', 'education'],
		aiModel: 'RoBERTa'
	},
	// 23
	{
		name: 'Understanding Modern Art',
		description:
			'Discuss a modern art movement. Explain its characteristics, key figures, and its influence on culture and society.',
		content:
			'Consider a movement like Dada. Discuss its characteristics, major artists and works, and how it reacted against societal norms. Reflect on its influence on subsequent art movements and its cultural significance.',
		tags: ['art', 'modern-art', 'education', 'culture', 'history'],
		aiModel: 'BERT'
	},
	// 24
	{
		name: 'Developing a Progressive Web App (PWA)',
		description:
			'Build a Progressive Web App. Discuss the process, code implementation, and performance considerations.',
		content:
			'Consider creating a PWA for a news feed. Discuss the process of setting up a service worker, caching assets for offline use, and setting up a web app manifest. Reflect on the advantages of PWAs and considerations for performance and user experience.',
		tags: ['coding', 'web-development', 'pwa', 'javascript', 'education'],
		aiModel: 'RoBERTa'
	},
	// 25
	{
		name: 'Social Psychology Concepts',
		description:
			'Discuss a key concept in social psychology. Explain its theory, experiments that support it, and real-world implications.',
		content:
			'Consider a concept like conformity. Discuss its theoretical foundation, landmark experiments like the Asch experiment, and implications in everyday life. Reflect on the importance of understanding these concepts and how they shape human behavior.',
		tags: ['psychology', 'social-psychology', 'education', 'human-behavior'],
		aiModel: 'BERT'
	},
	// 26
	{
		name: 'Building a Chatbot with Dialogflow',
		description:
			'Build a simple chatbot using Dialogflow. Discuss the setup, intents creation, and integration with a messaging platform.',
		content:
			'Consider creating a basic chatbot for booking appointments. Discuss the creation of agents, intents, entities, and contexts in Dialogflow, and how to integrate it with a messaging platform like Slack. Reflect on the role of chatbots in enhancing user interaction and potential improvements.',
		tags: ['coding', 'chatbot', 'dialogflow', 'ai', 'education'],
		aiModel: 'RoBERTa'
	},
	// 27
	{
		name: 'Exploring Human Anatomy',
		description:
			'Discuss a specific human body system. Explain its structure, function, and importance to overall health.',
		content:
			'Consider the cardiovascular system. Discuss the structure of the heart and blood vessels, the process of blood circulation, and its importance to overall health. Reflect on common diseases that affect this system and the importance of maintaining cardiovascular health.',
		tags: ['science', 'anatomy', 'education', 'health'],
		aiModel: 'BERT'
	},
	// 28
	{
		name: 'Cybersecurity Fundamentals',
		description:
			'Solve a cybersecurity problem. Discuss the process, techniques used, and preventative measures.',
		content:
			'Consider a scenario where a system is attacked by a phishing scheme. Discuss the process of identifying the attack, steps taken to mitigate it, and measures to prevent similar attacks in the future. Reflect on the importance of cybersecurity in the digital age.',
		tags: ['coding', 'cybersecurity', 'problem-solving', 'education'],
		aiModel: 'RoBERTa'
	},
	// 29
	{
		name: 'Analyzing Literary Works',
		description:
			'Analyze a literary work. Discuss its themes, stylistic devices used, historical context, and overall impact.',
		content: `Consider a work like George Orwell’s "1984". Discuss its major themes, Orwell's use of language and symbolism, its historical context, and its impact on literature and society. Reflect on its relevance in contemporary times.`,
		tags: ['literature', 'analysis', 'education', 'history', 'culture'],
		aiModel: 'BERT'
	},
	// 30
	{
		name: 'Creating a Blockchain with Python',
		description:
			'Build a simple Blockchain using Python. Discuss the process, code implementation, and basic principles of blockchain.',
		content:
			'Consider creating a basic Blockchain in Python. Discuss the creation of blocks, implementing the proof of work, and creating transactions. Reflect on the principles of blockchain technology and its potential applications.',
		tags: ['coding', 'blockchain', 'python', 'education', 'cryptocurrency'],
		aiModel: 'RoBERTa'
	},
	// 31
	{
		name: 'Exploring Classical Music',
		description:
			'Discuss a period in classical music. Explain its characteristics, key composers, and their influence.',
		content:
			'Consider the Romantic period. Discuss its distinguishing features, major composers like Chopin, and their impact on the evolution of music. Reflect on how it contrasts with other periods in classical music.',
		tags: ['music', 'classical-music', 'education', 'history'],
		aiModel: 'BERT'
	},
	// 32
	{
		name: 'Building Interactive UI with Vue.js',
		description:
			'Create an interactive user interface using Vue.js. Discuss the process, code implementation, and best practices.',
		content:
			'Consider building a real-time search feature with Vue.js. Discuss setting up the Vue instance, creating reactive data, and setting up event listeners. Reflect on how Vue.js facilitates the creation of interactive UIs.',
		tags: ['coding', 'web-development', 'vue.js', 'javascript', 'education'],
		aiModel: 'RoBERTa'
	},
	// 33
	{
		name: 'The Science of Climate Change',
		description:
			'Discuss the science behind climate change. Explain its causes, evidences, and potential solutions.',
		content:
			'Discuss greenhouse gases, their sources, and how they cause global warming. Reflect on evidence for climate change and potential technological and policy solutions.',
		tags: ['science', 'climate-change', 'education', 'environment'],
		aiModel: 'BERT'
	},
	// 34
	{
		name: 'Building a Server with Deno',
		description:
			'Build a server using Deno. Discuss the process, code implementation, and comparison with Node.js.',
		content:
			'Consider creating a basic HTTP server with Deno. Discuss the setup process, handling requests, and comparing the experience with Node.js. Reflect on the advantages and disadvantages of Deno.',
		tags: ['coding', 'deno', 'server', 'javascript', 'education'],
		aiModel: 'RoBERTa'
	},
	// 35
	{
		name: 'Understanding Genetics',
		description:
			'Discuss a topic in genetics. Explain its principles, real-world implications, and ethical considerations.',
		content:
			'Consider the topic of genetic engineering. Discuss its principles, applications in medicine and agriculture, and ethical considerations. Reflect on its impact on society and potential future developments.',
		tags: ['science', 'genetics', 'education', 'biology'],
		aiModel: 'BERT'
	},
	// 36
	{
		name: 'Developing with Angular',
		description:
			'Create a web application using Angular. Discuss the process, code implementation, and best practices.',
		content:
			'Consider creating a simple e-commerce application with Angular. Discuss setting up the Angular environment, creating components and services, and handling user input. Reflect on the advantages of Angular in building scalable web applications.',
		tags: ['coding', 'web-development', 'angular', 'javascript', 'education'],
		aiModel: 'RoBERTa'
	},
	// 37
	{
		name: 'Exploring World Religions',
		description:
			'Discuss a world religion. Explain its beliefs, practices, historical context, and influence.',
		content:
			'Consider Buddhism. Discuss its core beliefs, practices, the historical context of its emergence, and its influence on culture and society. Reflect on its philosophical aspects and how they relate to other religions.',
		tags: ['religion', 'history', 'education', 'culture'],
		aiModel: 'BERT'
	},
	// 38
	{
		name: 'Working with SQL',
		description:
			'Solve a problem using SQL. Discuss the problem, your SQL queries, and any considerations or potential optimizations.',
		content:
			'Consider a problem of retrieving specific data from a large database. Discuss your SQL query, how it solves the problem, and any considerations for efficiency or edge cases. Reflect on potential optimizations or alternate solutions.',
		tags: ['coding', 'database', 'sql', 'problem-solving', 'education'],
		aiModel: 'RoBERTa'
	},
	// 39
	{
		name: 'Exploring Philosophy',
		description:
			'Discuss a philosophical concept or philosopher. Explain the concept or philosopher’s ideas, historical context, and influence.',
		content:
			'Consider the concept of existentialism. Discuss its major ideas, philosophers who contributed to it like Jean-Paul Sartre, and its influence on society and culture. Reflect on its relevance in contemporary times.',
		tags: ['philosophy', 'history', 'education', 'culture'],
		aiModel: 'BERT'
	},
	// 40
	{
		name: 'Building a Full Stack Application with MERN Stack',
		description:
			'Create a full stack application using MongoDB, Express.js, React.js, and Node.js (MERN). Discuss the process, code implementation, and deployment.',
		content:
			'Consider creating a blogging platform with the MERN stack. Discuss setting up the backend with Node.js and Express, setting up the database with MongoDB, creating the frontend with React, and deploying the application. Reflect on the benefits and challenges of working with the MERN stack.',
		tags: ['coding', 'web-development', 'mern-stack', 'javascript', 'education'],
		aiModel: 'RoBERTa'
	},
	// 41
	{
		name: 'Understanding Quantum Mechanics',
		description:
			'Discuss a principle of quantum mechanics. Explain its theory, experiments that support it, and implications for our understanding of the physical world.',
		content:
			'Consider the principle of superposition. Discuss its theoretical foundation, key experiments like the double-slit experiment, and its implications for our understanding of reality.',
		tags: ['science', 'quantum-mechanics', 'education', 'physics'],
		aiModel: 'BERT'
	},
	// 42
	{
		name: 'Creating a Mobile App with React Native',
		description:
			'Create a mobile application using React Native. Discuss the process, code implementation, and best practices.',
		content:
			'Consider creating a weather application with React Native. Discuss setting up the environment, creating components, fetching data from an API, and handling user input. Reflect on the advantages of React Native in mobile application development.',
		tags: ['coding', 'mobile-development', 'react-native', 'javascript', 'education'],
		aiModel: 'RoBERTa'
	},
	// 43
	{
		name: 'The Psychology of Learning',
		description:
			'Discuss a concept in the psychology of learning. Explain its principles, supporting research, and implications for education.',
		content:
			'Consider the concept of spaced repetition. Discuss its principles, research supporting its effectiveness, and its implications for study habits and education. Reflect on how understanding such concepts can enhance learning.',
		tags: ['psychology', 'learning', 'education', 'research'],
		aiModel: 'BERT'
	},
	// 44
	{
		name: 'Creating Data Pipelines with Python',
		description:
			'Create a data pipeline using Python. Discuss the process, code implementation, and handling of potential errors.',
		content:
			'Consider creating a pipeline for data cleaning and transformation in Python. Discuss the use of libraries like Pandas, creating functions for cleaning tasks, and chaining these tasks. Reflect on the importance of data pipelines in data science projects.',
		tags: ['coding', 'data-science', 'python', 'education'],
		aiModel: 'RoBERTa'
	},
	// 45
	{
		name: 'Exploring World History',
		description:
			'Discuss a significant event in world history. Explain its causes, outcomes, and its influence on subsequent events.',
		content:
			'Consider World War II. Discuss its causes, key events, outcomes, and its impact on subsequent history. Reflect on its lessons and their relevance in contemporary times.',
		tags: ['history', 'world-history', 'education', 'culture'],
		aiModel: 'BERT'
	},
	// 46
	{
		name: 'Building a REST API with Django',
		description:
			'Build a REST API using Django. Discuss the process, code implementation, and testing.',
		content:
			'Consider creating a REST API for a bookstore with Django. Discuss setting up Django and Django REST Framework, creating models, serializers, and views, and testing the API. Reflect on the benefits of Django in building APIs.',
		tags: ['coding', 'web-development', 'django', 'api', 'education'],
		aiModel: 'RoBERTa'
	},
	// 47
	{
		name: 'Understanding Economic Theories',
		description:
			'Discuss an economic theory. Explain its principles, real-world applications, and potential criticisms.',
		content:
			'Consider the theory of supply and demand. Discuss its principles, how it applies to real-world markets, and potential criticisms or limitations. Reflect on its relevance in understanding economic behavior.',
		tags: ['economics', 'theory', 'education', 'business'],
		aiModel: 'BERT'
	},
	// 48
	{
		name: 'Developing Games with Unity',
		description:
			'Create a simple game using Unity. Discuss the process, code implementation, and best practices.',
		content:
			'Consider creating a 2D platformer game with Unity. Discuss setting up the Unity environment, creating game objects, implementing player controls, and adding game mechanics. Reflect on the process and what makes Unity a preferred choice for game development.',
		tags: ['coding', 'game-development', 'unity', 'education'],
		aiModel: 'RoBERTa'
	},
	// 49
	{
		name: 'Exploring Cultural Anthropology',
		description:
			'Discuss a topic in cultural anthropology. Explain its principles, research methods, and real-world implications.',
		content:
			'Consider the concept of cultural relativism. Discuss its principles, how anthropologists apply it in their research, and its implications for understanding and respecting cultural diversity.',
		tags: ['anthropology', 'culture', 'education', 'society'],
		aiModel: 'BERT'
	},
	// 50
	{
		name: 'Introduction to Data Structures',
		description:
			'Explain a type of data structure. Discuss its properties, operations, use-cases, and its implementation in a programming language.',
		content:
			'Consider the binary search tree (BST) data structure. Discuss its properties, basic operations like insertion and search, and its use-cases. Implement a BST in a language like Java or Python and discuss the code.',
		tags: ['coding', 'data-structures', 'education', 'computer-science'],
		aiModel: 'RoBERTa'
	},
	// 51
	{
		name: 'The World of Classical Literature',
		description:
			'Discuss a classical piece of literature. Explain its plot, characters, themes, and historical context.',
		content:
			'Consider Homer\'s "The Iliad". Discuss the epic’s plot, key characters, major themes, and its historical and cultural context. Reflect on its influence on literature and its contemporary relevance.',
		tags: ['literature', 'classical-literature', 'education', 'history'],
		aiModel: 'BERT'
	},
	// 52
	{
		name: 'Building a Chatbot with Node.js',
		description:
			'Create a chatbot using Node.js. Discuss the process, code implementation, and integration with messaging platforms.',
		content:
			'Consider building a simple chatbot that can answer FAQs. Discuss setting up the Node.js environment, creating the chat logic, and integrating with a platform like Slack. Reflect on the benefits and challenges of chatbot development.',
		tags: ['coding', 'chatbot', 'node.js', 'education'],
		aiModel: 'RoBERTa'
	},
	// 53
	{
		name: 'The Science of Nutrition',
		description:
			'Discuss a topic in nutrition science. Explain its principles, health impacts, and related dietary advice.',
		content:
			'Consider the role of dietary fiber. Discuss what it is, its health benefits, sources, and dietary recommendations. Reflect on its importance in a balanced diet.',
		tags: ['science', 'nutrition', 'health', 'education'],
		aiModel: 'BERT'
	},
	// 54
	{
		name: 'Creating a Web Scraping Tool with Python',
		description:
			'Build a web scraping tool using Python. Discuss the process, code implementation, and ethical considerations.',
		content:
			'Consider creating a scraper to gather data from a website using Python and libraries like BeautifulSoup. Discuss the process, the code, and ethical considerations in web scraping. Reflect on its uses and limitations.',
		tags: ['coding', 'web-scraping', 'python', 'education'],
		aiModel: 'RoBERTa'
	},
	// 55
	{
		name: 'Exploring Modern Art',
		description:
			'Discuss a modern art movement. Explain its characteristics, key artists, and influences.',
		content:
			'Consider the Surrealist movement. Discuss its key characteristics, prominent artists like Salvador Dalí, and its influence on art and culture. Reflect on its philosophies and impact on subsequent art movements.',
		tags: ['art', 'modern-art', 'education', 'culture'],
		aiModel: 'BERT'
	},
	// 56
	{
		name: 'Developing a Mobile App with Flutter',
		description:
			'Create a mobile application using Flutter. Discuss the process, code implementation, and deployment to app stores.',
		content:
			'Consider creating a recipe app with Flutter. Discuss setting up the Flutter environment, creating screens, managing state, and deploying the app to app stores. Reflect on the benefits of Flutter in mobile app development.',
		tags: ['coding', 'mobile-development', 'flutter', 'education'],
		aiModel: 'RoBERTa'
	},
	// 57
	{
		name: 'Understanding Human Psychology',
		description:
			'Discuss a concept in human psychology. Explain its principles, research supporting it, and its impact on human behavior.',
		content:
			'Consider the concept of cognitive dissonance. Discuss its definition, experimental studies like Festinger and Carlsmith’s study, and its impact on attitudes and behavior.',
		tags: ['psychology', 'human-behavior', 'education', 'science'],
		aiModel: 'BERT'
	},
	// 58
	{
		name: 'Working with Blockchain and Cryptocurrencies',
		description:
			'Introduce blockchain technology and cryptocurrencies. Discuss their principles, workings, and potential applications.',
		content:
			'Discuss what blockchain is, its key features, and how cryptocurrencies like Bitcoin use blockchain. Explore potential applications and implications of blockchain technology.',
		tags: ['blockchain', 'cryptocurrency', 'technology', 'education'],
		aiModel: 'RoBERTa'
	},
	// 59
	{
		name: 'The Beauty of Poetry',
		description:
			'Discuss a well-known poem. Analyze its structure, language, themes, and context.',
		content:
			'Consider Robert Frost’s "The Road Not Taken". Analyze its structure, use of language, major themes, and the historical and personal context of the poem. Reflect on its impact and interpret its meanings.',
		tags: ['poetry', 'literature', 'education', 'culture'],
		aiModel: 'BERT'
	},
	// 60
	{
		name: 'Building Websites with JAMstack',
		description:
			'Build a website using JAMstack principles. Discuss the process, code implementation, and benefits.',
		content:
			'Consider building a blog website using JAMstack principles, with technologies like JavaScript, APIs, and Markdown. Discuss the process, the code, and the benefits of JAMstack, such as performance and security.',
		tags: ['coding', 'web-development', 'jamstack', 'education'],
		aiModel: 'RoBERTa'
	},
	// 61
	{
		name: 'The Basics of Astronomy',
		description:
			'Discuss an astronomy topic. Explain its principles, related discoveries, and its significance in understanding the universe.',
		content:
			'Consider the life cycle of a star. Discuss the stages from nebula to possible outcomes like white dwarf, neutron star, or black hole. Reflect on the role of stars in the cosmos.',
		tags: ['astronomy', 'science', 'education', 'space'],
		aiModel: 'BERT'
	},
	// 62
	{
		name: 'Introduction to Deep Learning',
		description:
			'Introduce a concept in deep learning. Discuss its principles, applications, and code implementation.',
		content:
			'Consider the concept of convolutional neural networks (CNNs). Discuss their structure, how they work, their applications in image recognition, and implement a basic CNN using a library like TensorFlow.',
		tags: ['coding', 'deep-learning', 'machine-learning', 'education'],
		aiModel: 'RoBERTa'
	},
	// 63
	{
		name: 'Exploring Environmental Science',
		description:
			'Discuss an environmental science topic. Explain its principles, impact on the planet, and potential solutions.',
		content:
			'Consider the topic of climate change. Discuss what it is, how human activities contribute to it, its potential impacts, and strategies for mitigation and adaptation.',
		tags: ['environmental-science', 'climate-change', 'education', 'science'],
		aiModel: 'BERT'
	},
	// 64
	{
		name: 'Creating an eCommerce Website with Shopify',
		description:
			'Create an eCommerce website using Shopify. Discuss the process, customization, and best practices for user experience.',
		content:
			'Consider setting up an online store on Shopify. Discuss setting up the store, choosing and customizing a theme, adding products, and optimizing for a better user experience.',
		tags: ['ecommerce', 'shopify', 'web-development', 'education'],
		aiModel: 'RoBERTa'
	},
	// 65
	{
		name: 'Understanding Sociology',
		description:
			'Discuss a sociological theory or concept. Explain its principles, related research, and real-world implications.',
		content:
			'Consider the theory of social constructionism. Discuss its principles, how it explains social phenomena, and its implications for understanding society and culture.',
		tags: ['sociology', 'theory', 'education', 'society'],
		aiModel: 'BERT'
	},
	// 66
	{
		name: 'Developing Applications with React Native',
		description:
			'Create a mobile application using React Native. Discuss the process, code implementation, and deployment to app stores.',
		content:
			'Consider creating a to-do list app with React Native. Discuss setting up the React Native environment, creating components, managing state, and deploying the app to app stores. Reflect on the benefits of React Native in mobile app development.',
		tags: ['coding', 'mobile-development', 'react-native', 'education'],
		aiModel: 'RoBERTa'
	},
	// 67
	{
		name: 'The Fascinating World of Quantum Physics',
		description:
			'Discuss a topic in quantum physics. Explain its principles, related experiments, and its significance in science.',
		content:
			'Consider the concept of quantum entanglement. Discuss what it is, its implications for understanding the nature of reality, and key experiments like the Bell test experiments.',
		tags: ['physics', 'quantum-physics', 'education', 'science'],
		aiModel: 'BERT'
	},
	// 68
	{
		name: 'Building a Progressive Web App',
		description:
			'Build a progressive web application (PWA). Discuss the process, code implementation, and benefits.',
		content:
			'Consider creating a news reader PWA. Discuss setting up the development environment, creating the app shell, making it work offline with service workers, and adding a manifest file for "add to home screen" capability.',
		tags: ['coding', 'web-development', 'pwa', 'education'],
		aiModel: 'RoBERTa'
	},
	// 69
	{
		name: 'Exploring Music Theory',
		description:
			'Discuss a concept in music theory. Explain its principles, its use in compositions, and its impact on musical understanding.',
		content:
			'Consider the concept of harmonic progression. Discuss what it is, how it guides the movement of chords in a composition, and its impact on the listener’s emotional experience.',
		tags: ['music', 'music-theory', 'education', 'art'],
		aiModel: 'BERT'
	},
	// 70
	{
		name: 'Building a Full-Stack Application with MERN Stack',
		description:
			'Create a full-stack application using the MERN stack (MongoDB, Express.js, React, Node.js). Discuss the process, code implementation, and deployment.',
		content:
			'Consider creating a simple social media app with the MERN stack. Discuss setting up the development environment, creating the backend and frontend, connecting them, and deploying the app.',
		tags: ['coding', 'full-stack-development', 'mern-stack', 'education'],
		aiModel: 'RoBERTa'
	}
];

const USERS = [
	// {
	// 	username: 'adamgonda',
	// 	email: 'adamgondagyula@gmail.com',
	// },
	{
		username: 'chloeBall',
		email: 'chloeBall@gmail.com',
		image: 'https://randomuser.me/api/portraits/women/40.jpg'
	},
	{
		username: 'ethanRiley',
		email: 'ethanRiley@gmail.com',
		image: 'https://randomuser.me/api/portraits/men/80.jpg'
	},
	{
		username: 'sophiaWilliamson',
		email: 'sophiaWilliamson@gmail.com',
		image: 'https://randomuser.me/api/portraits/women/95.jpg'
	}
];

// get users
async function getUsers() {
	const users = USERS.map(async (user) => {
		return await prisma.user.create({
			data: {
				username: user.username,
				email: user.email,
				image: user.image
			}
		});
	});

	return await Promise.all(users);
}

async function main() {
	// Get the array of users
	const users = await getUsers();

	// Function to get a random element from an array
	const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

	// Function to get a random subset of an array
	const getRandomSubset = (array, minLen, maxLen) => {
		const shuffled = array.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen);
	};

	// Function to get a random number between two values
	const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	// Iterate over each item in the RAW_PROMPTS array
	for (const [idx, prompt] of RAW_PROMPTS.entries()) {
		// Randomly select an author
		const author = getRandomElement(users);

		// Randomly select some users to like the prompt
		const likers = getRandomSubset(users, 1, users.length);

		// Randomly select forkedCount
		const forkedCount = getRandomNumber(1, 1000);

		// Check if the AI Model exists, create if it doesn't
		let aiModel = await prisma.aiModel.findUnique({ where: { name: prompt.aiModel } });
		if (!aiModel) {
			aiModel = await prisma.aiModel.create({
				data: { name: prompt.aiModel, link: 'https://chat.openai.com/' }
			});
		}

		// Check if the tags exist, create them if they don't
		const createdTags = [];
		for (const tagName of prompt.tags) {
			let tag = await prisma.tag.findUnique({ where: { name: tagName } });
			if (!tag) {
				tag = await prisma.tag.create({
					data: { name: tagName }
				});
			}
			createdTags.push(tag);
		}

		const fulltext = promptToString(prompt);

		// Create the prompt
		await prisma.prompt.create({
			data: {
				name: prompt.name  + ' ' + idx,
				description: prompt.description,
				content: prompt.content,
				slug: prompt.name.toLowerCase().replace(/\s/g, '-') + ' ' + idx,
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
					connect: createdTags.map((tag) => ({ id: tag.id }))
				},
				likes: {
					create: likers.map((user) => ({ userId: user.id }))
				},
				forkedCount: forkedCount,
				fulltext
			}
		});
	}
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
	const rawString = `${prompt.name} ${prompt.description} ${prompt.content}`;
	return getCleanText(rawString);
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
