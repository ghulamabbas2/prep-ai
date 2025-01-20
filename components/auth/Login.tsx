"use client";

import React from "react";
import { Button, Input, Link, Form, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { signIn } from "next-auth/react";
import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/app/dashboard",
    });

    if (res?.error) {
      return toast.error(res?.error);
    }

    if (res?.ok) {
      router.push("/app/dashboard");
    }
  });

  const handleGithubLogin = async () => {
    await signIn("github", {
      callbackUrl: "/app/dashboard",
    });
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/app/dashboard",
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-medium">Welcome Back</p>
          <p className="text-small text-default-500">
            Log in to your account to continue
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
          validationBehavior="native"
        >
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
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
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Link
              className="text-default-500"
              href="/password/forgot"
              size="sm"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isDisabled={loading}
            isLoading={loading}
          >
            Sign In
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
            onPress={handleGoogleLogin}
          >
            Continue with Google
          </Button>
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
            onPress={handleGithubLogin}
          >
            Continue with Github
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/register" size="sm">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
