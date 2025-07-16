import Store from '../../services/Store';
import ChatAPI from './chatApi';
import { GetChatUsersRequest, UserToChatRequest } from './types';
import WebSocketForChat from '../../services/WebSocket';

export const getChat = async () => {
    await ChatAPI.getChat().then(async (chats) => {
        Store.set({ chats: chats });
    }).catch(error => {
        console.log(error);
    });
};

export const createChat = async (title: string) => {
    await ChatAPI.createChat(title).then(async () => {
        await getChat();
    }).catch((error) => console.log(error));
};

export const deleteChat = async (id: number) => {
    await ChatAPI.deleteChat(id);
};

export const getTokenChat = async (data: {chatId: number}) => {
    await ChatAPI.getTokenChat(data).then((token) => {
        Store.set({tokenChat: token.token})
        const userId = Store.getState().user?.id;
        if (userId) {WebSocketForChat.init(userId, data.chatId, token.token)}
    });
};

export const addUserToChat = async (formData: UserToChatRequest) => {
    await ChatAPI.addUserToChat(formData).then(async () => { await getChatUsers({id: formData.chatId}) });
};

export const deleteUserFromChat = async (formData: UserToChatRequest) => {
    await ChatAPI.deleteUserFromChat(formData);
};

export const getChatUsers = async (formData: GetChatUsersRequest) => {
    return await ChatAPI.getChatUsers(formData);
};
