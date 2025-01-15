"use client";

import React from "react";
import { Button, Input, Link, Form } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { registerUser } from "@/actions/auth.actions";

export default function Register() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await registerUser(
      data.name as string,
      data.email as string,
      data.password as string
    );
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-medium">Welcome</p>
          <p className="text-small text-default-500">
            Create an account to get started
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Form validationBehavior="native" onSubmit={submitHandler}>
            <div className="flex flex-col w-full">
              <Input
                isRequired
                classNames={{
                  base: "-mb-[2px]",
                  inputWrapper:
                    "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                }}
                label="Full Name"
                name="name"
                placeholder="Enter your username"
                type="text"
                variant="bordered"
              />
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
              <Input
                isRequired
                minLength={8}
                classNames={{
                  base: "-mb-[2px]",
                  inputWrapper:
                    "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                }}
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
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
            </div>

            <Button className="w-full mt-2" color="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/login" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
