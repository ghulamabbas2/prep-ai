import dbConnect from "../config/dbConnect";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Interview from "../models/interview.model";
import { evaluateAnswer, generateQuestions } from "../openai/openai";
import { InterviewBody } from "../types/interview.types";
import { getCurrentUser } from "../utils/auth";

const mockQuestions = (numOfQuestions: number) => {
  const questions = [];
  for (let i = 0; i < numOfQuestions; i++) {
    questions.push({
      question: `Mock question ${i + 1}`,
      answer: `Mock answer ${i + 1}`,
    });
  }
  return questions;
};

export const createInterview = catchAsyncErrors(async (body: InterviewBody) => {
  await dbConnect();

  const {
    industry,
    type,
    topic,
    numOfQuestions,
    difficulty,
    duration,
    user,
    role,
  } = body;

  const questions = await generateQuestions(
    industry,
    topic,
    type,
    role,
    numOfQuestions,
    duration,
    difficulty
  );

  console.log(questions);

  // const questions = mockQuestions(numOfQuestions);

  const newInterview = await Interview.create({
    industry,
    type,
    topic,
    numOfQuestions,
    difficulty,
    duration: duration * 60,
    durationLeft: duration * 60,
    user,
    role,
    questions,
  });

  return newInterview?._id
    ? { created: true }
    : (() => {
        throw new Error("Interview not created");
      })();
});

export const getInterviews = catchAsyncErrors(async (request: Request) => {
  await dbConnect();

  const user = await getCurrentUser(request);

  const interviews = await Interview.find({ user: user?._id });

  return { interviews };
});

export const deleteUserInterview = catchAsyncErrors(
  async (interviewId: string) => {
    await dbConnect();

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      throw new Error("Interview not found");
    }

    await interview.deleteOne();

    return { deleted: true };
  }
);

export const evaluteAnswer1 = catchAsyncErrors(async () => {
  await evaluateAnswer(
    "What is React.js, and how does it differ from traditional JavaScript frameworks?",
    "React.js is a JavaScript library that is used for building user interfaces. It is different from traditional JavaScript frameworks because it uses a virtual DOM to update the UI efficiently, and it allows developers to create reusable UI components."
  );
});
