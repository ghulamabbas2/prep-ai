import { IQuestion } from "@/backend/models/interview.model";

export const saveAnswerToLocalStorage = (
  interviewId: string,
  questionId: string,
  answer: string
) => {
  const key = `interview-${interviewId}-answers`;
  const storedAnswers = JSON.parse(localStorage.getItem(key) || "{}");
  storedAnswers[questionId] = answer;

  localStorage.setItem(key, JSON.stringify(storedAnswers));
};

export const getAnswerFromLocalStorage = (
  interviewId: string,
  questionId: string
) => {
  const key = `interview-${interviewId}-answers`;
  const storedAnswers = JSON.parse(localStorage.getItem(key) || "{}");
  return storedAnswers[questionId] || "";
};

export const getAnswersFromLocalStorage = (interviewId: string) => {
  const key = `interview-${interviewId}-answers`;
  const storedAnswers = localStorage.getItem(key);
  return storedAnswers ? JSON.parse(storedAnswers) : null;
};

export const getFirstIncompleteQuestionIndex = (questions: IQuestion[]) => {
  const firstIncompleteIndex = questions.findIndex(
    (question) => !question?.completed
  );

  return firstIncompleteIndex !== -1 ? firstIncompleteIndex : 0;
};
