
import { GetServerSidePropsContext } from 'next/types';

export const CONSTANTS = {
    baseUrl: ''
}


export const getBaseUrl = (ctx: GetServerSidePropsContext) => {
    const baseUrl = `http://${ctx.req.headers.host}`
    CONSTANTS.baseUrl = baseUrl
    // return baseUrl

}
export const getHeader = (ctx: GetServerSidePropsContext) => {
    const headers = {
        Cookie: ctx.req.headers.cookie
    }
    return headers
}

export const getAPIContext = (ctx: GetServerSidePropsContext) => {
    return {
        baseUrl: getBaseUrl(ctx),
        headers: getHeader(ctx)
    }
}