import Navbar from '@/components/Navbar'
import './globals.css'
import 'react-datepicker/dist/react-datepicker.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthContext from '../context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Open Table',
    template: 'Open Table | %s',
  },
  description: 'Make a reservation online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <AuthContext>
          <header className="bg-white">
            <Navbar />
          </header>
          <main className="bg-gray-100 flex flex-col min-h-full flex-grow">
            <div className="bg-white container mx-auto max-w-screen-2xl">
              {children}
            </div>
          </main>
        </AuthContext>
      </body>
    </html>
  )
}
