import os

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.vectorstores import InMemoryVectorStore


from dotenv import load_dotenv

load_dotenv()  

class HandleRagUseCase:
    
    def __init__(self, file):
        self.file = file
        self.docs = None
        self.chunks = None
        self.retriever = None
        self.qa_chain = None

    def handle_pdf_load(self):
        """
        Get the pdf sent and extract the text from it.
    
        """
        print("Handle PDF Load")
        if self.file is None:
            raise ValueError("A file must be provided.")
        
        loader = PyPDFLoader(self.file)
        self.docs = loader.load()

    def handle_text_split(self):
        """
        Divide the loaded documents into smaller chunks of 500 characters with 50 characters overlap.
        If no documents are loaded, raise an error.
        """
        print("Handle Text Split")
        if not hasattr(self, 'docs'):
            raise ValueError("No documents loaded.")
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        self.chunks = text_splitter.split_documents(self.docs)

    def handle_embeddings(self):
        """
        Create embeddings for the text chunks using OpenAIEmbeddings.
        """
        print("Handle Embeddings")
        if not hasattr(self, 'chunks'):
            raise ValueError("No text chunks available.")
        
        embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get("OPENAI_API_KEY"))
        vectorstore = InMemoryVectorStore.from_documents(self.chunks, embeddings)
        return vectorstore.as_retriever()

    def execute(self):
        self.handle_pdf_load()
        self.handle_text_split()
        return self.handle_embeddings()