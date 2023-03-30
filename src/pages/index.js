import { Inter } from 'next/font/google'
import { SignUp } from './logIn/SignUp'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <SignUp/>
    </>
  )
}
