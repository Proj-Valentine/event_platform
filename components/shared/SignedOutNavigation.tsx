// use client is used to mke usePathname work in the browser
"use client";

import { SignedOutNav } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const SignedOutNavigation = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex-between md:flex w-full flex-col items-start gap-3 md:flex-row">
      {SignedOutNav.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-medium-5 whitespace-nowrap dark:text-white`}
          >
            <Button asChild className="rounded-full dark:text-white" size="md">
              <Link href={link.route}>{link.label}</Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default SignedOutNavigation;
