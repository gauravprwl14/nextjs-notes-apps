import {
  CreateNoteBodyParams,
  DeleteNoteBodyParams,
  UpdateNoteBodyParams,
} from "../types/note";

export const fetcher = (
  url: string,
  data: DeleteNoteBodyParams | UpdateNoteBodyParams | CreateNoteBodyParams
) => {
  fetch(window.location.origin + url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => {
    return r.json();
  });
};
