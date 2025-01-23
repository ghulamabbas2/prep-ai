"use client";

import React from "react";
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
import { IInterview } from "@/backend/models/interview.model";
import { Key } from "@react-types/shared";
import { useRouter } from "next/navigation";
import { deleteInterview } from "@/actions/interview.action";
import toast from "react-hot-toast";
import Link from "next/link";

export const columns = [
  { name: "INTERVIEW", uid: "interview" },
  { name: "RESULT", uid: "result" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

type ListInterviewProps = {
  data: {
    interviews: IInterview[];
  };
};

export default function ListInterviews({ data }: ListInterviewProps) {
  const { interviews } = data;

  const router = useRouter();

  const deleteInterviewHandler = async (interviewId: string) => {
    const res = await deleteInterview(interviewId);

    if (res?.error) {
      return toast.error(res?.error?.message);
    }

    if (res?.deleted) {
      toast.success("Interview deleted successfully");
      router.push("/app/interviews");
    }
  };

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
              <p className="text-bold text-sm capitalize">0/10</p>
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
          return (
            <>
              {interview?.answered === 0 &&
              interview?.status !== "completed" ? (
                <Button
                  className="bg-foreground font-medium text-background w-full"
                  color="secondary"
                  endContent={
                    <Icon icon="solar:arrow-right-linear" fontSize={20} />
                  }
                  variant="flat"
                  as={Link}
                  href={`/app/interviews/conduct/${interview._id}`}
                >
                  Start
                </Button>
              ) : (
                <div className="relative flex items-center gap-2">
                  {interview?.status !== "completed" && (
                    <Tooltip color="danger" content="Continue Interview">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <Icon
                          icon="solar:round-double-alt-arrow-right-bold"
                          fontSize={22}
                          onClick={() =>
                            router.push(
                              `/app/interviews/conduct/${interview._id}`
                            )
                          }
                        />
                      </span>
                    </Tooltip>
                  )}
                  <Tooltip color="danger" content="Delete Interview">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Icon
                        icon="solar:trash-bin-trash-outline"
                        fontSize={21}
                        onClick={() => deleteInterviewHandler(interview._id)}
                      />
                    </span>
                  </Tooltip>
                </div>
              )}
            </>
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
}
