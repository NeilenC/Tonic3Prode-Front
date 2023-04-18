import React from 'react'
import Head from 'next/head'
import Navbar from '@/pages/Navbar'
import Footer from './Footer'

const LayOut = ({children}) => {
  return (
    <>
    <Head>
        <title>GAMBET</title>
        {/* <link rel="icon" href="/favicon.ico" /> ACA AGREGAMOS EL FAVICON */ }
      </Head>
      <Navbar />
      {children}
      {/* <Footer/> */}
    </>
  )
}

export default LayOut