"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { Logo } from "@/config/Logo";
import HeaderUser from "./HeaderUser";
import { Button, Link, User } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { siteConfig } from "@/config/site";

const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">{siteConfig?.name}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2"></NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <Button
            className="bg-foreground font-medium text-background px-5"
            color="secondary"
            radius="full"
            variant="flat"
            as={Link}
            href="/subscribe"
          >
            Subscribe for $9.99
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <HeaderUser />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle aria-label="Open menu" />
      </NavbarContent>

      <NavbarMenu className="pt-16">
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: "/images/default_user.png",
          }}
          className="transition-transform mb-5"
          description="john.doe@example.com"
          name="John Doe"
        />
        <NavbarMenuItem>
          <Link
            color={"foreground"}
            href="/admin/dashboard"
            size="lg"
            className="flex gap-1"
          >
            <Icon icon="tabler:user-cog" /> Admin Dashboard
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
            color={"foreground"}
            href="/app/dashboard"
            size="lg"
            className="flex gap-1"
          >
            <Icon icon="hugeicons:ai-brain-04" /> App Dashboard
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link color={"danger"} as={Link} size="lg" className="flex gap-1">
            <Icon icon="tabler:logout-2" /> Logout
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Navbar;
