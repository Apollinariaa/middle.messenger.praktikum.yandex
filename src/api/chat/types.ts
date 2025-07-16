export interface GetChatRequest {
    offset?: number;
    limit?: number;
    title?: number;
}

export interface GetChatResponse {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: {
      user: {
        first_name: string;
        second_name: string;
        avatar: string;
        email: string;
        login:string;
        phone: string;
      },
      time: string;
    }
    content: string;
}

export interface DeleteChatResponse {
    userId:  number;
    result: {
        id:  number;
        title: string;
        avatar: string;
        created_by:  number;
    }
}

export interface UserToChatRequest {
    users: number[];
    chatId: number;
}
export interface GetChatUsersRequest {
    id: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
}

export interface GetChatUsersResponse {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    role: string;
    avatar: string;
}
