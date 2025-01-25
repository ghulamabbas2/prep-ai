"use client";

import React from "react";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { isUserSubscribed } from "@/helpers/auth";
import { useSession } from "next-auth/react";
import { IUser } from "@/backend/models/user.model";

export default function HeaderAccouncement() {
  const { data } = useSession();
  const user = data?.user as IUser;
  return (
    <>
      {!isUserSubscribed(user) && (
        <div className="flex w-full items-center justify-center gap-x-3 border-b-1 border-divider bg-background/[0.15] px-6 py-2 backdrop-blur-xl sm:px-3.5">
          <p className="text-small text-foreground">
            <Link className="text-inherit text-sm" href="#">
              Prep Smarter, Succeed Faster – Your Interview Journey Starts
              Here!&nbsp;
            </Link>
          </p>
          <Button
            as={Link}
            className="group relative h-8 overflow-hidden bg-transparent text-small font-normal"
            color="default"
            endContent={
              <Icon
                className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                icon="solar:arrow-right-linear"
                width={14}
              />
            }
            href="/subscribe"
            style={{
              border: "solid 2px transparent",
              backgroundImage: `linear-gradient(hsl(var(--heroui-background)), hsl(var(--heroui-background))), linear-gradient(to right, #F871A0, #9353D3)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            variant="bordered"
          >
            Go
          </Button>
        </div>
      )}
    </>
  );
}
