import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const autPage = [
        "/notes",
    ];
    const isRootPath = pathname === '/'
    const conditionals = autPage.filter((path) => path == pathname)[0];

    const url = req.nextUrl.clone();
    const session = await getToken({
        req,
        // secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV == "production",
    });

    console.log('%c conditionals ', 'background: lime; color: black', { conditionals, pathname, isRootPath });


    if (session && isRootPath) {
        url.pathname = '/notes'
        return NextResponse.redirect(url);
    }

    if (conditionals) {
        url.pathname = "/";
        if (!session) {
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next()

    // console.log('%c conditionals ', 'background: lime; color: black', { conditionals, pathname });

    // if (conditionals) {
    //     const session = await getToken({
    //         req,
    //         // secret: process.env.JWT_SECRET,
    //         secureCookie: process.env.NODE_ENV == "production",
    //     });

    //     const url = req.nextUrl.clone();

    //     if (session) {
    //         if (isRootPath) {
    //             url.pathname = "/notes";
    //             return NextResponse.redirect(url);
    //         } else {
    //             return NextResponse.next()
    //         }
    //     } else {
    //         url.pathname = "/";
    //         return NextResponse.redirect(url);
    //     }
    // }
    // return NextResponse.next()
}
