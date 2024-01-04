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
import { ModeToggle } from '../ui/toggle-mode'


const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 dark:text-white border-b dark:bg-gray-900">
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
        <div className="flex w-2/5 justify-end items-start gap-3 dark:text-white ">
          {/* set up Clerk */}
          {/* SignedOut component is from clerk to control sign in and out */}
          <SignedIn>
            {/* after sign out redirect to Home */}
            <UserButton afterSignOutUrl="/"/>
            {/* <UserProfile /> */}
            <MobileNav />
          </SignedIn>

          <SignedOut>
            {/*after signput navigate to sign in page */}
            <Button asChild className="rounded-full md:hidden dark:text-white" size="lg">
              <Link href="/sign-in">Login In</Link>
            </Button>
            <SignedOutNavigation />
            {/* <SignInButton></SignInButton> */}
          </SignedOut>
        </div>
      </div>
      <ModeToggle/>
    
    </header>
  );
}

export default Header
