
# **AI Quest**  
**AI Quest** is an AI-powered Question Answering (QA) system that leverages advanced machine learning models to fetch, process, and deliver accurate and context-aware answers to user queries. The platform integrates Wikipedia-based knowledge retrieval, FAISS for semantic search, and a T5 transformer for generative answers.  

---

## **Features**  
- **Wikipedia Integration**: Fetches relevant content directly from Wikipedia.  
- **Semantic Search**: Uses FAISS to retrieve the most relevant paragraphs or sentences.  
- **Generative AI**: T5 model generates detailed and contextual answers.  
- **Future Enhancements**:  
  - Similar question handling and merging solutions.  
  - Integration with advanced LLMs (e.g., OpenAI GPT).  
  - Feedback mechanism for continuous improvement.  
  - Explainable AI module for transparency.  
  - Dynamic answer fusion for multi-faceted queries.  

---

## **Tech Stack**  
- **Backend**: Python, Flask  
- **Machine Learning**: FAISS, Sentence Transformers, T5 Model  
- **Knowledge Source**: Wikipedia API  
- **Database**: MongoDB (planned for logging and history tracking)  

---

## **Setup Instructions**  

### **Prerequisites**  
1. Python 3.8+  
2. Virtual Environment (Recommended)  
3. Required libraries (see `requirements.txt`)  

### **Installation**  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/Hackaholics05/AIQuest.git  
   cd AIQuest  
   ```  

2. Set up the virtual environment:  
   ```bash  
   python -m venv venv  
   source venv/bin/activate  # For Windows: venv\Scripts\activate  
   ```  

3. Install dependencies:  
   ```bash  
   pip install -r requirements.txt  
   ```  

4. Run the application:  
   ```bash  
   python main.py  
   ```  

5. Access the application at `http://localhost:5000`.  

---

## **How to Use**  
1. **Provide Input**:  
   - Enter a topic to fetch content from Wikipedia.  
   - Ask a specific question related to the topic.  

2. **View Output**:  
   - The system retrieves relevant content and generates a contextual answer.  

3. **Feedback (Future Feature)**:  
   - Rate answers to improve system responses.  

---

## **Folder Structure**  
```
AIQuest/  
│  
├── models/              # Pretrained model files and configurations  
├── static/              # Frontend static files (if applicable)  
├── templates/           # HTML templates for Flask frontend  
├── utils/               # Helper scripts for embeddings and search  
├── main.py              # Entry point for the application  
├── requirements.txt     # Python dependencies  
└── README.md            # Documentation  
```  

---

## **Future Enhancements**  
- **Enhanced Query Retrieval**:  
  - Merge answers for similar questions.  
- **LLM Integration**:  
  - Add OpenAI GPT for diverse topic handling.  
- **Feedback Mechanism**:  
  - Use ratings to improve answers via model fine-tuning.  
- **Explainable AI**:  
  - Provide transparent reasoning for answer generation.  
- **Dynamic Answer Fusion**:  
  - Combine multiple sources for detailed responses.  

---

## **Contributing**  
We welcome contributions! To contribute:  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-name`.  
3. Commit changes: `git commit -m "Added new feature"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Create a Pull Request.  

---



## **Contact**  
For queries, suggestions, or collaborations, please open an issue or contact us at **hackaholics05@gmail.com**.  

Happy Coding! 🚀  
