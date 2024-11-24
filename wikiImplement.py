import wikipedia
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
from transformers import T5ForConditionalGeneration, T5Tokenizer

# Initialize Models
print("Initializing models...")
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')  # For embeddings
t5_tokenizer = T5Tokenizer.from_pretrained('t5-small')    # For generative responses
t5_model = T5ForConditionalGeneration.from_pretrained('t5-small')  # Generative model
print("Models initialized.")

# Fetch Wikipedia Content
def fetch_wikipedia_page(page_name):
    try:
        page = wikipedia.page(page_name)
        return page.content
    except wikipedia.exceptions.DisambiguationError as e:
        print(f"Disambiguation error: {e.options}")
        return None
    except wikipedia.exceptions.HTTPTimeoutError:
        print("Timeout error while fetching data.")
        return None
    except Exception as e:
        print(f"Error fetching page: {e}")
        return None

#  Preprocess Content and Generate Embeddings
def create_embeddings(text):
    sentences = text.split("\n")  # Split content into paragraphs or sentences
    sentences = [s.strip() for s in sentences if s.strip()]  # Remove empty sentences
    embeddings = sentence_model.encode(sentences)  # Generate embeddings
    return sentences, embeddings

#Create FAISS Index
def create_faiss_index(embeddings):
    dim = embeddings.shape[1]  # Dimensionality of embeddings
    index = faiss.IndexFlatL2(dim)  # Use L2 (Euclidean) distance
    index.add(np.array(embeddings).astype(np.float32))
    return index

#  Retrieve Relevant Content
def get_relevant_sentences(query, faiss_index, sentences):
    query_embedding = sentence_model.encode([query])  # Encode query
    distances, indices = faiss_index.search(np.array(query_embedding).astype(np.float32), k=3)  # Retrieve top 3
    relevant_sentences = [sentences[i] for i in indices[0] if i < len(sentences)]
    return relevant_sentences

#  Generate Detailed Answer
def generate_answer(context, query):
    input_text = f"question: {query} context: {context}"
    inputs = t5_tokenizer(input_text, return_tensors='pt', max_length=512, truncation=True)
    outputs = t5_model.generate(inputs['input_ids'], max_length=150, num_beams=4, early_stopping=True)
    return t5_tokenizer.decode(outputs[0], skip_special_tokens=True)

#  Full Question Answering System
def qa_system(query, topic):
    # Fetch Wikipedia content
    print(f"Fetching data for topic: {topic}")
    page_content = fetch_wikipedia_page(topic)
    if not page_content:
        return "Sorry, I couldn't find information on that topic."

    # Generate embeddings and index
    print("Generating embeddings and indexing...")
    sentences, embeddings = create_embeddings(page_content)
    faiss_index = create_faiss_index(embeddings)

    # Retrieve relevant content
    print("Retrieving relevant content...")
    relevant_sentences = get_relevant_sentences(query, faiss_index, sentences)
    if not relevant_sentences:
        return "Sorry, I couldn't find relevant information."

    # Combine relevant sentences and generate an answer
    context = " ".join(relevant_sentences)
    print("Generating answer...")
    answer = generate_answer(context, query)
    return answer

# Usage
if __name__ == "__main__":
    print("Wikipedia-based QA System")
    print("-------------------------")
    topic = input("Enter a topic to search on Wikipedia: ")
    query = input("Enter your question: ")

    answer = qa_system(query, topic)
    print("\nAnswer:", answer)
