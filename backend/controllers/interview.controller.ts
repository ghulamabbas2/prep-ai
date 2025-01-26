import { getFirstDayOfMonth, getToday } from "@/helpers/helpers";
import dbConnect from "../config/dbConnect";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Interview, { IInterview, IQuestion } from "../models/interview.model";
import { evaluateAnswer, generateQuestions } from "../openai/openai";
import { InterviewBody } from "../types/interview.types";
import APIFilters from "../utils/apiFilters";
import { getCurrentUser } from "../utils/auth";
import { getQueryStr } from "../utils/utils";
import mongoose from "mongoose";

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

  const resPerPage: number = 2;

  const { searchParams } = new URL(request.url);
  const queryStr = getQueryStr(searchParams);

  queryStr.user = user?._id;

  const apiFilters = new APIFilters(Interview, queryStr).filter();

  let interviews: IInterview[] = await apiFilters.query;
  const filteredCount: number = interviews.length;

  apiFilters.pagination(resPerPage).sort();
  interviews = await apiFilters.query.clone();

  return { interviews, resPerPage, filteredCount };
});

export const getInterviewById = catchAsyncErrors(async (id: string) => {
  await dbConnect();

  const interview = await Interview.findById(id);

  return { interview };
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

export const updateInterviewDetails = catchAsyncErrors(
  async (
    interviewId: string,
    durationLeft: string,
    questionId: string,
    answer: string,
    completed?: boolean
  ) => {
    await dbConnect();

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      throw new Error("Interview not found");
    }

    if (answer) {
      const questionIndex = interview?.questions?.findIndex(
        (question: IQuestion) => question._id.toString() === questionId
      );

      if (questionIndex === -1) {
        throw new Error("Question not found");
      }

      const question = interview?.questions[questionIndex];

      let overallScore = 0;
      let clarity = 0;
      let relevance = 0;
      let completeness = 0;
      let suggestion = "No suggestion provided";

      if (answer !== "pass") {
        ({ overallScore, clarity, relevance, completeness, suggestion } =
          await evaluateAnswer(question.question, answer));
      }

      if (!question?.completed) {
        interview.answered += 1;
      }

      question.answer = answer;
      question.completed = true;
      question.result = {
        overallScore,
        clarity,
        relevance,
        completeness,
        suggestion,
      };

      interview.durationLeft = Number(durationLeft);
    }

    if (interview?.answered === interview?.questions?.length) {
      interview.status = "completed";
    }

    if (durationLeft === "0") {
      interview.durationLeft = Number(durationLeft);
      interview.status = "completed";
    }

    if (completed) {
      interview.status = "completed";
    }

    await interview.save();

    return { updated: true };
  }
);

export const getInterviewStats = catchAsyncErrors(async (req: Request) => {
  await dbConnect();

  const user = await getCurrentUser(req);

  const { searchParams } = new URL(req.url);
  const queryStr = getQueryStr(searchParams);

  const start = new Date(queryStr.start || getFirstDayOfMonth());
  const end = new Date(queryStr.end || getToday());

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  const stats = await Interview.aggregate([
    // Filter data
    {
      $match: {
        user: new mongoose.Types.ObjectId(user?._id),
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $facet: {
        dateSpecific: [
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              totalInterviews: { $sum: 1 },
              completedInterviews: {
                $sum: {
                  $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
                },
              },
              unansweredQuestions: {
                $sum: {
                  $reduce: {
                    input: "$questions",
                    initialValue: 0,
                    in: {
                      $add: [
                        "$$value",
                        {
                          $cond: [{ $eq: ["$$this.completed", false] }, 1, 0],
                        },
                      ],
                    },
                  },
                },
              },
              completedQuestions: {
                $sum: {
                  $reduce: {
                    input: "$questions",
                    initialValue: 0,
                    in: {
                      $add: [
                        "$$value",
                        {
                          $cond: [{ $eq: ["$$this.completed", true] }, 1, 0],
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              date: "$_id",
              totalInterviews: 1,
              completionRate: {
                $multiply: [
                  { $divide: ["$completedInterviews", "$totalInterviews"] },
                  100,
                ],
              },
              unansweredQuestions: 1,
              completedQuestions: 1,
            },
          },
        ],
        overallStats: [
          {
            $group: {
              _id: null,
              totalInterviews: { $sum: 1 },
              completedInterviews: {
                $sum: {
                  $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              totalInterviews: 1,
              overallCompletionRate: {
                $multiply: [
                  { $divide: ["$completedInterviews", "$totalInterviews"] },
                  100,
                ],
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        dateSpecific: 1,
        overallStats: { $arrayElemAt: ["$overallStats", 0] },
      },
    },
  ]);

  if (!stats?.length) {
    return {
      overallStats: {
        totalInterviews: 0,
        overallCompletionRate: 0,
      },
      stats: [],
    };
  }

  const overallStats = stats[0].overallStats || {
    totalInterviews: 0,
    overallCompletionRate: 0,
  };
  const dateSpecificStats = stats[0].dateSpecific || [];

  const formattedStats = {
    totalInterviews: overallStats.totalInterviews,
    completionRate: overallStats.overallCompletionRate?.toFixed(2),
    stats: dateSpecificStats?.map((stat: any) => ({
      date: stat?.date,
      totalInterviews: stat?.totalInterviews || 0,
      completionRate: stat?.completionRate?.toFixed(2),
      completedQuestion: stat?.completedQuestions || 0,
      unasweredQuestion: stat?.unansweredQuestions || 0,
    })),
  };

  return formattedStats;
});
