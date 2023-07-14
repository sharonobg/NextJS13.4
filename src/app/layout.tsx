import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Container, SSRProvider} from '@/app/components/bootstrap';
import NavBar from '../app/NavBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'React 13.4 You Tube',
  description: 'Image gallery using 13.4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SSRProvider>
          <NavBar />
          <main>
            <Container className="py-4">
              {children}
            </Container>
          </main>
        </SSRProvider>
        
      </body>
    </html>
  )
}
