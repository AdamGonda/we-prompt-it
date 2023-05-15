import { getAllAIModels } from '$lib/core/models/ai-model';
import { getPromptById } from '$lib/core/models/prompt';
import { getAllTags } from '$lib/core/models/tag';

export function load({ params }) {
    const id = Number(params.id)
    const prompt = getPromptById(id)
    const aiModels = getAllAIModels()
    const tags = getAllTags()

    return { prompt, aiModels, tags };
}

