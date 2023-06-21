import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'
import { Inter } from 'next/font/google'
import { Permanent_Marker } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker'
})

export const metadata = {
  title: 'ink',
  description: 'A blog focused on photography',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${permanentMarker.variable} font-sans leading-none min-h-screen text-dark-900 flex flex-col`}>
        <Header />
        <main className='relative flex flex-col items-center flex-grow'>
          {children}
        </main>
        <Footer />
        <div id='module'></div>
      </body>
    </html>
  )
}
