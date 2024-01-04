import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from '@/components/theme-provider';

// import { ThemeProvider } from "next-themes";


// const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'], weight: ['400', '500','600','700'], 
  variable: '--font-poppins',
   })
// change meta data here
export const metadata: Metadata = {
  title: 'Streamfy',
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* this will apply the poppins font to our app body */}
          <body className={poppins.variable}>{children}</body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
