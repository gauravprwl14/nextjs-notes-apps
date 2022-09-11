import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import mongoDBConnectionAdapter from "@/api-lib/mongo/dbAdapterConnect"
import { NextAuthOptions } from "next-auth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const googleProvider = GoogleProvider({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    // profile: (profile) => {
    //     return {
    //         ...profile,
    //         personnel_note: {
    //             note: 'dadjkfnadkjnakj'
    //         }
    //     }
    // }
});

export const authOptions: NextAuthOptions = {
    providers: [googleProvider],
};

export default NextAuth({
    adapter: MongoDBAdapter(mongoDBConnectionAdapter),
    providers: [googleProvider],
    secret: String(process.env.NEXTAUTH_SECRET),
    // pages: {
    //     signIn: "/",
    // },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            console.log('%c session, token, user ', 'background: lime; color: black', { session, token });
            const { user } = session

            if (!(user?.email)) {
                return session
            }

            const userData = await MongoDBAdapter(mongoDBConnectionAdapter).getUserByEmail(
                user.email
            );

            if (!userData) {
                return session
            }


            console.log('%c session, token, user, userData ', 'background: lime; color: black', { session, user, token, userData });



            session.user.id = userData.id as string;


            // @ts-ignore
            // session.user.userData = userData;

            // token.id = userData.id;

            // token.username = userData.username;

            return session;
        },
        jwt: async ({ user, token }) => {


            if (user) {
                token.uid = user.id as string;
            }

            return token

        },
        redirect: async ({ url, baseUrl }) => {
            const isRootPath = url === (baseUrl + '/')

            if (isRootPath) {
                return Promise.resolve(`${baseUrl}/notes`)
            }
            return Promise.resolve(url)
        },
    },



    // callbacks: {
    //     session: async ({ session, token }) => {
    //         if (session.user) {

    //             console.log('%c session.user ', 'background: lime; color: black', { user: session.user });
    //             // session.user.id = token.uid;
    //             // const user = await mongoDBConnection.user.findUniqueOrThrow({
    //             //     where: { id: token.uid },
    //             // });
    //             // session.user.username = user.username as string;
    //         }
    //         return session;
    //     },
    //     jwt: async ({ user, token }) => {
    //         if (user) {
    //             token.uid = user.id;
    //         }
    //         return token;
    //     },
    //     redirect: async ({ url }) => {
    //         if (url === '/') {
    //             return Promise.resolve('/notes')
    //         }
    //         return Promise.resolve(url)
    //     },
    //     // signIn: async (params, credentials) => {
    //     //     console.log('%c inside sign in fn ', 'background: lime; color: black', { params, credentials });
    //     //     return 
    //     // }

    // },
    // session: {
    //     strategy: "jwt",
    // },
});