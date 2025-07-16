import HTTPTransport from '../../services/HTTPTransport';
import { BASE_URL, DefaultResponse, options } from '../types';
import {
    GetChatResponse,
    DeleteChatResponse,
    UserToChatRequest,
    GetChatUsersRequest,
    GetChatUsersResponse
} from './types';

export const pathsChatApi = {
    chats: `${BASE_URL}/chats`,
    users: `${BASE_URL}/chats/users`,
    getToken: `${BASE_URL}/chats/token`,
}

class ChatAPI {
    async getChat(): Promise<GetChatResponse[]> {
        return HTTPTransport.get(pathsChatApi.chats, options)
    }

    async createChat(title: string): Promise<{id: number}> {
        return HTTPTransport.post(pathsChatApi.chats, {...options, data: { title }})
    }

    async deleteChat(id: number): Promise<DeleteChatResponse> {
        return HTTPTransport.delete(pathsChatApi.chats, {...options, data: { chatId: id }})
    }

    async getTokenChat(data: {chatId: number}): Promise<{token: string}> {
        return HTTPTransport.post(`${pathsChatApi.getToken}/${data.chatId}`, options)
    }

    async addUserToChat(data: UserToChatRequest): Promise<DefaultResponse> {
        return HTTPTransport.put(pathsChatApi.users, {...options, data: data as unknown as Record<string, unknown>})
    }

    async deleteUserFromChat(data: UserToChatRequest): Promise<DefaultResponse> {
        return HTTPTransport.delete(pathsChatApi.users, {...options, data: data as unknown as Record<string, unknown>})
    }

    async getChatUsers(data: GetChatUsersRequest): Promise<GetChatUsersResponse[]> {
        return HTTPTransport.get(`${pathsChatApi.chats}/${data.id}/users`, options)
    }
}

export default new ChatAPI();
