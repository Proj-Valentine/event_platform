"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3 dark:text-white">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {/* to purchase an event you need to be logged in ie route to sign out page */}
          <SignedOut>
            <Button
              asChild
              className="button rounded-full dark:text-white"
              size="lg"
            >
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            {/* self created component */}
            {/* if already logged in show checkout */}
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
