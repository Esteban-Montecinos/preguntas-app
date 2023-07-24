import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Preguntas',
  description: 'Aplicación de preguntas y respuestas anónimas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-auto min-h-screen max-w-screen-lg p-4 sm:p-24`}>{children}</body>
    </html>
  )
}
