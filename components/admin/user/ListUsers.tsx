"use client";

import { IUser } from "@/backend/models/user.model";
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
  Select,
  SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Key } from "@react-types/shared";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomPagination from "@/components/layout/pagination/CustomPagination";
import UpdateUser from "./UpdateUser";
import { cancelUserSubscription } from "@/actions/payment.action";
import { isUserSubscribed } from "@/helpers/auth";
import { deleteUser } from "@/actions/auth.actions";

export const columns = [
  { name: "USER", uid: "user" },
  { name: "LOGINS", uid: "logins" },
  { name: "SUBSCRIPTION", uid: "subscription" },
  { name: "ACTIONS", uid: "actions" },
];

type Props = {
  data: {
    users: IUser[];
    filteredCount: number;
    resPerPage: number;
  };
};

const ListUsers = ({ data }: Props) => {
  const { users, resPerPage, filteredCount } = data;

  const router = useRouter();

  const handleUnsubscribe = async (email: string) => {
    const res = await cancelUserSubscription(email);

    if (res?.error) {
      return toast.error(res.error?.message);
    }

    if (res?.status) {
      toast.success("Subscription cancelled successfully");
      router.push("/admin/users");
    }
  };

  const deleteUserHandler = async (userId: string) => {
    const res = await deleteUser(userId);

    if (res?.error) {
      return toast.error(res?.error?.message);
    }

    if (res?.deleted) {
      toast.success("User deleted successfully");

      router.push("/admin/users");
    }
  };

  const renderCell = React.useCallback((user: IUser, columnKey: Key) => {
    const cellValue = user[columnKey as keyof IUser];

    switch (columnKey) {
      case "user":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm ">{user?.name}</p>
            <p className="text-bold text-sm text-default-400">{user?.email}</p>
          </div>
        );
      case "logins":
        return (
          <div className="flex flex-col gap-2">
            {user?.authProviders?.map((provider, index) => (
              <Chip key={index} color={"warning"} size="sm" variant="flat">
                {provider?.provider}
              </Chip>
            ))}
          </div>
        );
      case "subscription":
        return (
          <Chip
            className="capitalize"
            color={
              user?.subscription?.status === "active" ? "success" : "danger"
            }
            size="sm"
            variant="flat"
          >
            {user?.subscription?.status ?? "No Subscription"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <UpdateUser user={user} />

            {isUserSubscribed(user) && (
              <Tooltip color="warning" content="Cancel Subscription">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <Icon
                    icon="solar:shield-cross-bold"
                    fontSize={22}
                    onClick={() => handleUnsubscribe(user?.email)}
                  />
                </span>
              </Tooltip>
            )}
            <Tooltip color="danger" content="Delete User">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Icon
                  icon="solar:trash-bin-trash-outline"
                  fontSize={21}
                  onClick={() => deleteUserHandler(user._id)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  let queryParams;

  const handleStatusChange = (status: string) => {
    queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has("subscription.status") && status === "all") {
      queryParams.delete("subscription.status");
    } else if (queryParams.has("subscription.status")) {
      queryParams.set("subscription.status", status);
    } else {
      queryParams.append("subscription.status", status);
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
          <SelectItem key={"active"}>Active</SelectItem>
          <SelectItem key={"canceled"}>Canceled</SelectItem>
          <SelectItem key={"past_due"}>Past Due</SelectItem>
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
        <TableBody items={users}>
          {(item: IUser) => (
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
};

export default ListUsers;
