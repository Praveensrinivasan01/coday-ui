const express = require('express');
const axios = require('axios');
const app = express();
const cors=require("cors")
const {parseQuiz}=require("./commonFunctions")
const {GoogleGenAI} =require("@google/genai")
const GAI=new GoogleGenAI({apiKey:"AIzaSyAJ5pL2eSceiDEsTN0XSkulzYkG-kBjzSg"})
app.use(express.json());
app.use(cors())

const PORT = 3000;

// Example route to generate a quiz
app.post('/quiz', async (req, res) => {
  const { topic, language } = req.body

  if (!topic || !language) {
    return res.status(400).json({ error: "topic and language are required" });
  }

  try {
    // Call your FastAPI endpoint
    const response = await axios.post('http://127.0.0.1:8000/generate-quiz', {
      topic,
      language
    });

    console.log(response)
    const formatted=parseQuiz(response.data.quiz)
    res.json({formatted,raw:response.data}).status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});





app.post("/gquiz",async(req,res)=>{
  try {
      const response = await GAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "give 3 questions about html with options with no additional ai dialouges",
    });
    console.log(response)
    res.send(response).status(200)
    
  } catch (error) {
    console.log(error)
    res.send(error)
  }


    
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
