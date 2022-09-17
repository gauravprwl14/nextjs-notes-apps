import { getSession, SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AppProvider } from "../store/context";
import { GetServerSidePropsContext } from 'next/types';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppProvider notes={pageProps.pokemon}>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = getSession(context)

  return {
    props: {
      session
    }
  }
}

export default MyApp
