import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const HeaderUser = () => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "/images/default_user.png",
            }}
            className="transition-transform"
            description="john.doe@example.com"
            name="John Doe"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">john.doe@example.com</p>
          </DropdownItem>
          <DropdownItem
            key="admin_dashboard"
            href="/admin/dashboard"
            startContent={<Icon icon="tabler:user-cog" />}
          >
            Admin Dashboard
          </DropdownItem>
          <DropdownItem
            key="app_dashboard"
            href="/app/dashboard"
            startContent={<Icon icon="hugeicons:ai-brain-04" />}
          >
            App Dashboard
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<Icon icon="tabler:logout-2" />}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default HeaderUser;
