import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf"
import { SupabaseVectorStore } from "langchain/vectorstores/supabase"
import { createClient } from "@supabase/supabase-js"

export const splitData = async () => {
    const apiKey = process.env.HUGGINGFACEHUB_API_KEY || ""
    const supabaseKey = process.env.SUPABASE_KEY || ""
    const supabaseUrl = process.env.SUPABASE_URL || ""

    const client = createClient(supabaseUrl, supabaseKey)

    try {
        const result = await fetch(`${process.env.PUbLIC_URL}/data.txt`)
        const text = await result.text()

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 250,
            chunkOverlap: 50, 
        })

        const output = await splitter.createDocuments([text])

        
        const res = await SupabaseVectorStore.fromDocuments(
            output,
            new HuggingFaceInferenceEmbeddings({
                apiKey
            }),
            {
                client,
                tableName: "data",
            },
        )

        console.log({res})

    } catch (error) {
        console.log(error)
    }
}