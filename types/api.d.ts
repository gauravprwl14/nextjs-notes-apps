export interface IResponsePayload<T> {
    data: T;
    isError: boolean,
    status: number
}
