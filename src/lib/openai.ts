import OpenAI from "openai";
const apiKey ="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"

if(!apiKey) {
    throw Error("OPENAI_API_KEY is not set");
}

const openai=new OpenAI({apiKey});
export default openai;

export async function getEmbedding(text:string) {
    const response=await openai.embeddings.create({
        model:"text-embedding-ada-002",
        input:text
    });

    const embedding=response.data[0].embedding;

    if(!embedding) throw Error("Error generating embedding");
    console.log(embedding);
    return embedding;
}

export async function getEmbeddingForNote(title:string,content:string) {
    return getEmbedding(title+"\n\n"+content ?? "");
}