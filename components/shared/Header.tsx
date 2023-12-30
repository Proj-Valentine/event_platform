import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

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
            <nav className='md:flex-between hidden w-full max-w-xs'>
                <NavItems/>
            </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">
            {/* set up Clerk */}
            {/* SignedOut component is from clerk to control sign in and out */}
            <SignedIn>
                {/* after sign out redirect to Home */}
                <UserButton afterSignOutUrl="/" />
                <MobileNav/>
            </SignedIn>

            <SignedOut>
                {/*after signput navigate to sign in page */}
                <Button asChild className="rounded-full" size="lg">
                <Link href="/sign-in">Login In</Link>
                </Button>
            </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Header
