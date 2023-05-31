import '@tensorflow/tfjs-backend-cpu';
import { TensorFlowEmbeddings } from 'langchain/embeddings/tensorflow';

async function main() {
	const embeddings = new TensorFlowEmbeddings();
	const text = 'Hello, world!';
	const result = await embeddings.embedQuery(text);

	console.log('log result', result);
}

main()