import { GooglePaLM } from "langchain/llms/googlepalm"
import { splitData } from "@/lib/splitter"

splitData()

export default function Home() {

    return (
        <main>
            Hello World: Langchain
        </main>
    )
}
