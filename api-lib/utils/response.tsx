import type { NextApiResponse } from 'next'
import { IResponsePayload } from '@/types/api'

export const errorResponse = <T,>(payload: T, status: number) => {
    return {
        // data: {
        //     ...payload,

        // },
        data: payload,
        status,
        isError: true
    }
}

export const successResponse = <T,>(payload: T, status: number) => {
    const data = payload

    return {
        data: payload,
        status,
        isError: false
    }
}

export const responseHandler = <T = String>(res: NextApiResponse, payload: T, status: number, isError = false) => {

    let apiResponse: IResponsePayload<T> = {
        isError: false,
        status: 200,
        data: payload
    }


    const hasError = isError || status >= 400

    if (hasError) {
        apiResponse = errorResponse(payload, status)
    } else {
        apiResponse = successResponse(payload, status)
    }


    return res.status(status).json(apiResponse)


}