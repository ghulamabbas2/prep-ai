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
  Select,
  SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { IInterview } from "@/backend/models/interview.model";
import { Key } from "@react-types/shared";
import { usePathname, useRouter } from "next/navigation";
import { deleteInterview } from "@/actions/interview.action";
import toast from "react-hot-toast";
import Link from "next/link";
import { calculateAverageScore } from "@/helpers/interview";
import CustomPagination from "../layout/pagination/CustomPagination";
import { isAdminPath } from "@/helpers/auth";

export const columns = [
  { name: "INTERVIEW", uid: "interview" },
  { name: "RESULT", uid: "result" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

type ListInterviewProps = {
  data: {
    interviews: IInterview[];
    resPerPage: number;
    filteredCount: number;
  };
};

export default function ListInterviews({ data }: ListInterviewProps) {
  const { interviews, resPerPage, filteredCount } = data;

  const router = useRouter();
  const pathname = usePathname();

  const deleteInterviewHandler = async (interviewId: string) => {
    const res = await deleteInterview(interviewId);

    if (res?.error) {
      return toast.error(res?.error?.message);
    }

    if (res?.deleted) {
      toast.success("Interview deleted successfully");

      if (isAdminPath(pathname)) {
        router.push("/admin/interviews");
      } else {
        router.push("/app/interviews");
      }
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
          return (
            <>
              {interview?.answered === 0 &&
              interview?.status !== "completed" &&
              !isAdminPath(pathname) ? (
                <Button
                  className="bg-foreground font-medium text-background"
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
                <div className="relative flex items-center justify-center gap-2">
                  {interview?.status !== "completed" &&
                    !isAdminPath(pathname) && (
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

                  {interview?.status === "completed" && (
                    <Tooltip content="View Result">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <Icon
                          icon="solar:eye-broken"
                          fontSize={22}
                          onClick={() =>
                            router.push(`/app/results/${interview._id}`)
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

  let queryParams;

  const handleStatusChange = (status: string) => {
    queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has("status") && status === "all") {
      queryParams.delete("status");
    } else if (queryParams.has("status")) {
      queryParams.set("status", status);
    } else {
      queryParams.append("status", status);
    }

    const path = `${window.location.pathname}?${queryParams.toString()}`;
    router.push(path);
  };

  return (
    <div className="my-4">
      <div className="flex justify-end items-center mb-4">
        <Select
          size="sm"
          className="max-w-xs"
          label="Select a status"
          onChange={(event) => handleStatusChange(event.target.value)}
        >
          <SelectItem key={"all"}>All</SelectItem>
          <SelectItem key={"pending"}>Pending</SelectItem>
          <SelectItem key={"completed"}>Completed</SelectItem>
        </Select>
      </div>
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

      <div className="flex justify-center items-center mt-10">
        <CustomPagination
          resPerPage={resPerPage}
          filteredCount={filteredCount}
        />
      </div>
    </div>
  );
}
