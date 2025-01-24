"use client";

import React, { useRef, useState } from "react";

import ResultStats from "./ResultStats";
import { Chip, Pagination } from "@heroui/react";
import { Icon } from "@iconify/react";
import { IInterview } from "@/backend/models/interview.model";
import QuestionCard from "./QuestionCard";
import { getTotalPages, paginate } from "@/helpers/helpers";

export default function ResultDetails({
  interview,
}: {
  interview: IInterview;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 2;

  const totalPages = getTotalPages(
    interview?.questions?.length,
    questionsPerPage
  );

  const currentQuestions = paginate(
    interview?.questions,
    currentPage,
    questionsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="px-5">
        <ResultStats interview={interview} />

        <div className="w-full flex flex-col gap-3">
          <div className="flex flex-col md:flex-row justify-between items-center my-5 gap-4">
            <div className="flex flex-wrap gap-4">
              <Chip
                color="primary"
                startContent={
                  <Icon icon="tabler:circle-check-filled" width={20} />
                }
                variant="faded"
              >
                {interview?.industry}
              </Chip>

              <Chip
                color="warning"
                startContent={
                  <Icon icon="tabler:circle-check-filled" width={20} />
                }
                variant="faded"
              >
                {interview?.type}
              </Chip>

              <Chip
                color="secondary"
                startContent={
                  <Icon icon="tabler:circle-check-filled" width={20} />
                }
                variant="faded"
              >
                {interview?.topic}
              </Chip>
            </div>
          </div>

          {currentQuestions.map((question, index) => (
            <QuestionCard
              key={index}
              index={(currentPage - 1) * questionsPerPage + index + 1}
              question={question}
            />
          ))}

          <div className="flex justify-center items-center mt-10">
            <Pagination
              isCompact
              showControls
              showShadow
              initialPage={1}
              total={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>

          <div className="flex justify-center items-center mt-10"></div>
        </div>
      </div>
    </div>
  );
}
