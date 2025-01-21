"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { cn, Listbox, ListboxItem } from "@heroui/react";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import { adminPages, appPages } from "@/constants/pages";
import { Key } from "@react-types/shared";
import { getPageIconAndPath } from "@/helpers/helpers";

interface IconWrapperProps {
  children: ReactNode;
  className?: string;
}

export const IconWrapper = ({ children, className }: IconWrapperProps) => (
  <div
    className={cn(
      className,
      "flex items-center rounded-small justify-center w-7 h-7"
    )}
  >
    {children}
  </div>
);

const AppSiderbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pages = pathname?.includes("/admin") ? adminPages : appPages;

  const [selectedKey, setSelectedKey] = useState<Key>(pathname);

  useEffect(() => {
    setSelectedKey(pathname);
  }, [pathname]);

  const handleAction = (key: Key) => {
    setSelectedKey(key);
    router.push(key?.toString());
  };

  return (
    <div className="sticky top-[90px] z-10">
      <Listbox
        aria-label="User Menu"
        className="py-8 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none h-12 data-[hover=true]:bg-default-100/80",
        }}
        selectedKeys={[selectedKey]}
        onAction={handleAction}
      >
        <ListboxItem
          key="#"
          className={"mt-3"}
          textValue="New Interview"
          startContent={
            <Button
              className="bg-foreground font-medium text-background w-full"
              color="secondary"
              endContent={<Icon icon="ep:circle-plus-filled" />}
              variant="flat"
              as={Link}
              href="/app/interviews/new"
            >
              New Interview
            </Button>
          }
        />
        <>
          {pages?.map((page) => (
            <ListboxItem
              key={page.path}
              className={`mt-3 ${
                selectedKey?.toString()?.includes(page.path)
                  ? "bg-gray-100 dark:bg-gray-800"
                  : ""
              } `}
              startContent={
                <IconWrapper
                  className={`bg-${
                    getPageIconAndPath(page.path).color
                  }/10 text-${getPageIconAndPath(page.path).color}`}
                >
                  <Icon
                    icon={getPageIconAndPath(page.path)?.icon}
                    className="text-lg"
                  />
                </IconWrapper>
              }
              textValue=""
            >
              {page.title}
            </ListboxItem>
          ))}
        </>
      </Listbox>
    </div>
  );
};

export default AppSiderbar;
