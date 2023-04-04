import { Inter } from 'next/font/google'
import { SignUp } from '../../app/logIn/SignUp'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <SignUp/>
    </>
  )
}
