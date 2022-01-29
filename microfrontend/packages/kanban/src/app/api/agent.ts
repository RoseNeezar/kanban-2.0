import queryString from "query-string";
import { ajax } from "rxjs/ajax";

const baseURL = "http://127.0.0.1:3030/api/kanban";

const requestRxjs = {
  get: <T>(url: string) =>
    ajax<T>({
      url: `${baseURL}${url}`,
      method: "GET",
      withCredentials: true,
    }),
  post: <T>(url: string, body?: {}) =>
    ajax<T>({
      url: `${baseURL}${url}`,
      method: "POST",
      withCredentials: true,
      body,
    }),
  put: <T>(url: string, body?: {}) =>
    ajax<T>({
      url: `${baseURL}${url}`,
      method: "PUT",
      withCredentials: true,
      body,
    }),
  del: <T>(url: string) =>
    ajax<T>({
      url: `${baseURL}${url}`,
      method: "DELETE",
      withCredentials: true,
    }),
};

const kanbanService = {
  sendMessage: (data: { content: string; chatId: string }) =>
    requestRxjs.post<any>(queryString.stringifyUrl({ url: "message" }), {
      content: data.content,
      chatId: data.chatId,
    }),
  getChatMessagesChatId: (data: {
    chatId: string;
    page: number;
    limit: number;
  }) =>
    requestRxjs.get<any>(
      queryString.stringifyUrl({
        url: `chats/${data.chatId}/messages`,
        query: data,
      })
    ),
  markReadChatMessagesChatId: (data: string) =>
    requestRxjs.put<void>(
      queryString.stringifyUrl({ url: `chats/${data}/messages/markAsRead` })
    ),
};

const agent = {
  kanbanService,
};

export default agent;
