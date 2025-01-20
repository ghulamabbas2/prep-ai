"use client";

import React from "react";
import { Button, Input, Form } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
import { resetPassword } from "@/actions/auth.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPassword({ token }: { token: string }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const res = await resetPassword(
      token,
      data.newPassword,
      data.confirmPassword
    );

    if (res?.error) {
      return toast.error(res?.error?.message);
    }

    if (res?.passwordUpdated) {
      toast.success("Password reset successfully");
      router.push("/login");
    }
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-medium">Reset Password</p>
          <p className="text-small text-default-500">
            Enter your new password to reset
          </p>
        </div>

        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="New Password"
            name="newPassword"
            placeholder="Enter your new password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />

          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
          />

          <Button
            className="w-full"
            color="primary"
            type="submit"
            endContent={<Icon icon="akar-icons:arrow-right" />}
            isDisabled={loading}
            isLoading={loading}
          >
            Reset
          </Button>
        </Form>
      </div>
    </div>
  );
}
