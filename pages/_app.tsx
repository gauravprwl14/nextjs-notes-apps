import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
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
import AppErrorFallback from '@/components/ApiErrorBoundary'
import { AppProvider } from "../store/context";
import { GetServerSidePropsContext } from 'next/types';


interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState: ReturnType<typeof dehydrate>;
  };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);
  return (
    <SessionProvider session={session}>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppProvider notes={pageProps.pokemon}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ErrorBoundary
              onError={(error, info) => {
                if (process.env.NODE_ENV === 'production') {
                  // uploadErrorDetails(error, info);
                }
                setErrorInfo(info);
              }}
              fallbackRender={fallbackProps => {
                return <AppErrorFallback {...fallbackProps} errorInfo={errorInfo} />;
              }}
            >
              <Component {...pageProps} />
            </ErrorBoundary>
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
