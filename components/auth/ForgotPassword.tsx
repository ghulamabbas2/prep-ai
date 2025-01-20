"use client";

import React from "react";
import { Button, Input, Form } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
import { forgotPassword } from "@/actions/auth.actions";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const email = data.email;
    const res = await forgotPassword(email);

    if (res?.error) {
      return toast.error(res?.error?.message);
    }

    if (res?.emailSent) {
      return toast.success("Password reset link sent to your email");
    }
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-medium">Forgot Password</p>
          <p className="text-small text-default-500">
            Enter your email to reset your password
          </p>
        </div>

        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            classNames={{
              base: "-mb-[2px]",
              inputWrapper:
                "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
            }}
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
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
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
}
