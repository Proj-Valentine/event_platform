import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import SignedOutNavigation from './SignedOutNavigation'
import { UserProfile } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            alt="evently logo"
            width={128}
            height={38}
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>
        {/* <SignedOut>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <SignedOutNavigation />
          </nav>
        </SignedOut> */}
        <div className="flex w-2/5 justify-end items-start gap-3">
          {/* set up Clerk */}
          {/* SignedOut component is from clerk to control sign in and out */}
          <SignedIn>
            {/* after sign out redirect to Home */}
            <UserButton afterSignOutUrl="/" showName />
            {/* <UserProfile /> */}
            <MobileNav />
          </SignedIn>

          <SignedOut>
            {/*after signput navigate to sign in page */}
            <Button asChild className="rounded-full md:hidden" size="lg">
              <Link href="/sign-in">Login In</Link>
            </Button>
            <SignedOutNavigation />
             {/* <SignInButton></SignInButton> */}
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Header
