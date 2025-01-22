"use server";

import {
  createInterview,
  deleteUserInterview,
  evaluteAnswer1,
} from "@/backend/controllers/interview.controller";
import { InterviewBody } from "@/backend/types/interview.types";

export async function newInterview(body: InterviewBody) {
  return await createInterview(body);
}

export async function deleteInterview(interviewId: string) {
  return await deleteUserInterview(interviewId);
}

export async function evaluateUserAnswer() {
  return await evaluteAnswer1();
}
