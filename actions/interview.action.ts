"use server";

import {
  createInterview,
  deleteUserInterview,
  updateInterviewDetails,
} from "@/backend/controllers/interview.controller";
import { InterviewBody } from "@/backend/types/interview.types";

export async function newInterview(body: InterviewBody) {
  return await createInterview(body);
}

export async function deleteInterview(interviewId: string) {
  return await deleteUserInterview(interviewId);
}

export async function updateInteview(
  interviewId: string,
  durationLeft: string,
  questionId: string,
  answer: string,
  completed?: boolean
) {
  return await updateInterviewDetails(
    interviewId,
    durationLeft,
    questionId,
    answer,
    completed
  );
}
