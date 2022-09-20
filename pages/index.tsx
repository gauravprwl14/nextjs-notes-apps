
import type { NextPage } from "next";
import { signIn, signOut, useSession } from 'next-auth/react';
import { } from '@/api-lib/react-query'
// import { unstable_getServerSession } from "next-auth/next"
// import { authOptions } from 'pages/api/auth/[...nextauth]'
// import Image from 'next/image'
// import Layout from '../components/Layout'
// import SectionLayout from '../components/Common/SectionLayout'

console.log('%c process.env ', 'background: lime; color: black', { env: process.env });

const Home: NextPage<{}> = ({ }) => {
  // const [session, loading] = useSession();
  const { data: session, status } = useSession()

  console.log('%c status ', 'background: lime; color: black', { status });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-screen h-max min-h-screen">
      <div className=" min-h-screen h-full flex flex-1">
        <div className="sm:w-1/2 sm:flex sm:justify-center sm:items-center sm:m-20 sm:mt-6">
          {/* <Image height={"100%"} width="100%" src="/images/product_development.png" alt="programmer" /> */}
          <img className="w-full" src="/images/product_development.png" />
        </div>

        <div className="flex flex-1 flex-col justify-center items-center sm:items-start mt-20 sm:mt-16">
          <p className="font-semibold text-xl mt-1 mb-3">
            Log In to Your Account
            {(!status || status === 'unauthenticated') ? (
              <>
                <button className="" onClick={() => signIn("google")}>
                  Sign In
                </button>
              </>
            ) : <>
              <button className="" onClick={() => signOut()}>
                Sign out
              </button>
            </>}
          </p>
        </div>
      </div>


    </div>
  );
};


// export async function getServerSideProps(context) {
//   const session = await unstable_getServerSession(context.req, context.res, authOptions)

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: '/',
//   //       permanent: false,
//   //     },
//   //   }
//   // }

//   return {
//     props: {}
//   }

//   // return {
//   //   redirect: {
//   //     destination: '/notes',
//   //     permanent: false,
//   //   },
//   // }


// }

export default Home;
