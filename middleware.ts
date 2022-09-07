import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const autPage = [
        "/notes",
    ];
    const conditionals = autPage.filter((path) => path == pathname)[0];

    console.log('%c conditionals ', 'background: lime; color: black', { conditionals, pathname });

    if (conditionals) {
        const session = await getToken({
            req,
            secret: process.env.JWT_SECRET,
            secureCookie: process.env.NODE_ENV == "production",
        });

        const url = req.nextUrl.clone();
        url.pathname = "/";
        if (!session) return NextResponse.redirect(url);
    }
}
