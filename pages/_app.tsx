import { useEffect, useState } from "react";
import { getSession, SessionProvider } from 'next-auth/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AppProvider } from "../store/context";
import { GetServerSidePropsContext } from 'next/types';


interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState: ReturnType<typeof dehydrate>;
  };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppProvider notes={pageProps.pokemon}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
          </AppProvider>
        </Hydrate>
      </QueryClientProvider>
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
