import React from 'react'
import './globals.css'
import Head from '../components/Head'

export default function SSS({ Component, pageProps, router }) {
    return (
        <>
            <Head />
            <Component {...pageProps} key={router.route} />
        </>
    )
}
