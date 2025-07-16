export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const BASE_WEB_SOCKET_URL = 'wss://ya-praktikum.tech/ws/chats';

export const options = {
 mode: 'cors',
  headers: {
    Accept: 'application/json',
    ['Content-Type']: 'application/json; charset=utf-8',
  },
};

export type ErrorResponse = { reason: string; };

export type DefaultResponse = 'OK' | ErrorResponse;
