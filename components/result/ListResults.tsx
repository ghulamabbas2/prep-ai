"use client";

import React from "react";

import { IInterview } from "@/backend/models/interview.model";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Key } from "@react-types/shared";
import toast from "react-hot-toast";
import Link from "next/link";
import { calculateAverageScore } from "@/helpers/interview";

type Props = {
  data: {
    interviews: IInterview[];
  };
};

export const columns = [
  { name: "INTERVIEW", uid: "interview" },
  { name: "RESULT", uid: "result" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const ListResults = ({ data }: Props) => {
  const { interviews } = data;

  const renderCell = React.useCallback(
    (interview: IInterview, columnKey: Key) => {
      const cellValue = interview[columnKey as keyof IInterview];

      switch (columnKey) {
        case "interview":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{interview?.topic}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {interview?.type}
              </p>
            </div>
          );
        case "result":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {calculateAverageScore(interview?.questions)} / 10
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {interview?.numOfQuestions} questions
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={interview?.status === "completed" ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return interview?.status === "completed" ? (
            <Button
              className="bg-foreground font-medium text-background"
              color="secondary"
              endContent={
                <Icon icon="solar:arrow-right-linear" fontSize={20} />
              }
              variant="flat"
              as={Link}
              href={`/app/results/${interview._id}`}
            >
              View Result
            </Button>
          ) : (
            <p>Complete Interview to view result.</p>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="my-4">
      <Table aria-label="Interivews table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={interviews}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListResults;
