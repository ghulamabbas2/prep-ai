import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuestions = async (
  industry: string,
  topic: string,
  type: string,
  role: string,
  numOfQuestions: number,
  duration: number,
  difficulty: string
) => {
  const tokensPerQuestion = 500;
  const maxTokens = tokensPerQuestion * numOfQuestions;

  const prompt = `
    Generate total "${numOfQuestions}" "${difficulty}" "${type}" interview questions for the topic "${topic}" in the "${industry}" industry.
    The interview is for a candidate applying for the role of "${role}" and total duration of interview is "${duration}" minutes.
    
    **Ensure the following:**
    - The questions are well-balanced, including both open-ended and specific questions.
    - Each question is designed to evaluate a specific skill or knowledge area relevant to the role.
    - The questions are clear, concise and engaging for the candidate.
    - The questions are suitable for a "${difficulty}" interview in the "${industry}" industry.
    - Ensure the questions are directly aligned with "${difficulty}" responsibilities and expertise in "${role}".
    
    **Instructions:**
    - Always follow same format for questions.
    - Provide all question without any prefix.
    - No question number or bullet points or hypen - is required.
    `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are expert in generating questions tailored to specific roles, industries, experience levels and topic. You responses should be professional, concise and well-structured. ",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: maxTokens,
    temperature: 0.8,
  });

  const content = response?.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Failed to generate questions");
  }

  const questions = content
    .trim()
    .split("\n")
    .filter((q) => q)
    .map((q) => ({
      question: q,
    }));

  return questions;
};

function extractScoresAndSuggestion(content: string) {
  const overAllScoreMatch = content.match(/Overall score=(\d+)/);
  const relevanceScoreMatch = content.match(/Relevance score=(\d+)/);
  const clarityScoreMatch = content.match(/Clarity score=(\d+)/);
  const completenessScoreMatch = content.match(/Completeness score=(\d+)/);
  const suggestionsMatch = content.match(/Suggestions=(.*)/);

  const overAllScore = overAllScoreMatch ? overAllScoreMatch[1] : "0";
  const relevance = relevanceScoreMatch ? relevanceScoreMatch[1] : "0";
  const clarity = clarityScoreMatch ? clarityScoreMatch[1] : "0";
  const completeness = completenessScoreMatch ? completenessScoreMatch[1] : "0";
  const suggestion = suggestionsMatch ? suggestionsMatch[1] : "";

  return {
    overallScore: parseInt(overAllScore),
    relevance: parseInt(relevance),
    clarity: parseInt(clarity),
    completeness: parseInt(completeness),
    suggestion,
  };
}

export const evaluateAnswer = async (question: string, answer: string) => {
  const prompt = `
    Evaluate the following answer to the question based on the evaluation criteria and provide the scores for relevance, clarity, and completeness, followed by suggestions in text format.
    
    **Evaluation Criteria:**
        1. Overall Score: Provide an overall score out of 10 based on the quality of the answer.
        2. Relevance: Provide a score out of 10 based on how relevant the answer is to the question.
        3. Clarity: Provide a score out of 10 based on how clear and easy to understand the explanation is.
        4. Completeness: Provide a score out of 10 based on how well the answer covers all aspects of the question.
        5. Suggestions: Provide any suggestions or improvements to the answer in text.

    **Question:** ${question}
    **Answer:** ${answer}

    **Instructions:**
        - Always follow same format for providing scores and suggestions.
        - Provide the score only like "Overall score=5", "Relevance score=7", "Clarity =9", "Completeness score=1", for following:
            - Overall score
            - Relevance score
            - Clarity score
            - Completeness score
        -Provide text only for following only like "Suggestions=your_answer_here":  
            - Suggestions or improved answer in text.
    `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert evaluator with a strong understanding of assessing answers to interview questions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 500,
    temperature: 0.8,
  });

  const content = response?.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Failed to evaluate answer");
  }

  const result = extractScoresAndSuggestion(content);

  return {
    overallScore: result.overallScore,
    relevance: result.relevance,
    clarity: result.clarity,
    completeness: result.completeness,
    suggestion: result.suggestion,
  };
};
