import * as dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import { answerMyQuestion } from "./answerMyQuestion.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, _, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
});

app.post("/ask", async (req, res) => {
  try {
    const prompt = req.body.question;
    const answer = await answerMyQuestion(prompt);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    for await (const chunk of answer) {
      res.write(chunk);
    }
    res.end();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
