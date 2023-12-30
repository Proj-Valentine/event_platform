import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white">   
       <div className="">
        <Link href="/" className="">
            <Image src="/assets/images/logo.svg" alt="evently logo" width={128} height={38} />
        </Link>
        <div className="flex w-32 justify-end gap-3">
            
        </div>

            


       </div>
    </header>
   
  )
}

export default Header
