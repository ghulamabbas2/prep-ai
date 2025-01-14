"use client ";

import { Logo } from "@/config/Logo";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted mt-20 md:py-8 lg:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Logo />
          <span className="text-lg font-semibold">{siteConfig?.name}</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm md:justify-end">
          <Link
            href="/"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/#pricing"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          &copy; {} {siteConfig?.name}. All rights reserved.{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
