"use client";

import { updateUser } from "@/actions/auth.actions";
import { IUser } from "@/backend/models/user.model";
import { userRoles } from "@/constants/constants";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Tooltip,
  CheckboxGroup,
  Form,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateUser({ user }: { user: IUser }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [name, setName] = useState(user.name || "");
  const [roles, setRoles] = useState(user.roles || []);

  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await updateUser(user._id, { name, roles });

    if (res?.error) {
      return toast.error(res?.error?.message);
    }

    if (res?.updated) {
      toast.success("User updated successfully");
      onClose();
      router.push("/admin/users");
    }
  };

  return (
    <>
      <Tooltip color="secondary" content="Edit user">
        <span className="text-lg text-secondary-400 cursor-pointer active:opacity-50">
          <Icon icon={"tabler:user-edit"} fontSize={22} onClick={onOpen} />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <Form onSubmit={submitHandler}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update User
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Name"
                    placeholder="Enter name"
                    variant="bordered"
                    value={name}
                    onValueChange={setName}
                    isRequired
                  />
                  <Input
                    label="Email"
                    placeholder="Enter email"
                    variant="bordered"
                    type="email"
                    value={user?.email}
                    isDisabled
                  />

                  <div className="flex flex-col gap-3 mt-3">
                    <CheckboxGroup
                      color="default"
                      label="Select User Roles"
                      value={roles}
                      onValueChange={setRoles}
                    >
                      {userRoles?.map((role, index) => (
                        <Checkbox key={index} value={role}>
                          {role}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Update User
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
}
