// import {
//   CreateNoteBodyParams,
//   DeleteNoteBodyParams,
//   UpdateNoteBodyParams,
// } from "../types/note";


export enum HttpMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",

}

export const fetcher = (
  url: string,
  method: HttpMethods,
  header: any,
  data: undefined | any
) => {

  return fetch(url, {
    method: method || 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...header
    },
    body: JSON.stringify(data),
  }).then((r) => {
    console.log('%c r ', 'background: lime; color: black', { r });
    return r.json();
  });
};
