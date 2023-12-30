import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from "@clerk/nextjs";


// const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'], weight: ['400', '500','600','700'], 
  variable: '--font-poppins',
   })
// change meta data here
export const metadata: Metadata = {
  title: 'Evently',
  description: 'Event management platform',
  icons:"/assets/images/logo.png",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* this will apply the poppins font to our app body */}
        <body className={poppins.variable}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
