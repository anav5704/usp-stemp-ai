import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

export const splitData = async () => {
    try {
        const result = await fetch(`${process.env.PUbLIC_URL}/data/usp-stemp-courses.txt`)
        const text = await result.text()

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50
        })

        const output = await splitter.createDocuments([text])
        console.log(output)

    } catch (error) {
        console.log(error)
    }
}