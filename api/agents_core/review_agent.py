from rag.rag import HandleRagUseCase
from agents import Agent, Runner, function_tool, ModelSettings

INSTRUCTIONS = """
    You are a study assistant specialized in reviewing books and structured documents. 
    You will receive context from a retrieval tool that contains relevant passages from the book or knowledge base. 

    Your task:
    - Carefully analyze the provided context. 
    - Create a clear, structured, and concise review about the requested term or chapter. 
    - Focus only on the information found in the retrieved context. DO NOT INVENT OR ASSUME FACTS that are not present. 
    - Write the review in a didactic and engaging way, as if preparing study notes or a summary for students.
    - Ensure the review is well-organized, using headings or bullet points if necessary.

    - Use Markdown for structuring the review, including headings, subheadings, and bullet points where appropriate.
    - Structure the review with at least three sections, such as:
        ## Introdução  
        ## Principais pontos  
        ## Conclusão

    RETURN THIS INFORMATION IN PORTUGUESE
"""

@function_tool
def retrieve_docs(query: str, file: str) -> str:
    """
    Retrieve relevant documents for the user's question.
    file -> path to the file (string) coming from Gradio.
    """
    print(f"Running document retrieval for file: {file}")
    retriever = HandleRagUseCase(file).execute()
    print("Retrierver:")
    print(retriever)
    docs = retriever.get_relevant_documents(query)[:3]
    return "\n\n".join([d.page_content for d in docs])

class ReviewAgent:

    async def run(self, chapter_term: str, file: str) -> str:
        """
        Run the review agent.
        file: path to the file received from Gradio (e.g., /tmp/tmpabcd.pdf)
        """
        print("Running RevisitionAgent")
        rag_agent = Agent(
            name="RevisitionAgent",
            model="gpt-4o-mini",
            instructions=INSTRUCTIONS,
            tools=[retrieve_docs],
            model_settings=ModelSettings(tool_choice="required"),
        )

        
        result = await Runner.run(
            rag_agent, 
            f"Given this query: {chapter_term} and this file: {file}. Return the informations"
        )
        return result.final_output