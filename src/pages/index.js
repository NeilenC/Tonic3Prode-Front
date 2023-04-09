//import { Inter } from 'next/font/google'
import { SignUp } from './logIn/SignUp'

//const inter = Inter({ subsets: ['latin'] })
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from 'react';



export default function Home() {
  const router = useRouter()
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo) {
      router.push('/home');
    }
  }, [userInfo]);

  return (
    <>
      {!userInfo ? (
        <SignUp />
      ) : null}
    </>
  )
}
