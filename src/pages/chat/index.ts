import { addUserToChat, createChat, deleteUserFromChat, getChatUsers, getTokenChat } from '../../api/chat/chat';
import { GetChatResponse, GetChatUsersResponse } from '../../api/chat/types';
import Button from '../../components/Button';
import ChatItem from '../../components/ChatItem';
import ChatMessager from '../../components/ChatMessager';
import InputMessage from '../../components/InputMessage/index';
import RoundButton from '../../components/RoundButton';
import SubmitButton from '../../components/SubmitButton';
import Block from '../../services/Block';
import Store from '../../services/Store';
import Router from '../../services/router/Router';
import { RoutesLinks } from '../../utils/regex';
import { template } from './Chat';
import './Chat.scss';
import WebSocketForChat from '../../services/WebSocket';
import UsersListChat from '../../components/UsersListChat';
import ItemMessage from '../../components/ItemMessage';

const button = new Button('button', {
        children: 'Перейти в профиль',
        events: {
            click: () => {
                Router.getInstance().go(RoutesLinks.profile);
            },
        },
        attr: { class: 'profile_btn'}
    }
);

const input_add_user_for_chat = new InputMessage('input', {
    attr: { placeholder: 'ID user', class: 'user_id_add'}
})

const roundButton = new RoundButton('button',{
    events: {
        click: async (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
            const form = document.querySelector('#chat_form_message') as HTMLFormElement;
            const inputMessager = form?.querySelector('input');
            if (inputMessager) {
                const value = inputMessager.value.trim();
                if (value !== '') {
                    await WebSocketForChat.sendMessage(value);
                    inputMessager.value = '';
                }
            }
        }
    }
});

const createChatBtn = new SubmitButton('button',{
    children: 'Создать чат',
    attr: { class: 'style-margin create_chat_btn'},
    events: {
        click: async (e: Event) => {
            e.preventDefault();
            const form = document.querySelector('#chat_form_create') as HTMLFormElement;
            const inputSearch = form?.querySelector('input');
            if (inputSearch) {
                const value = inputSearch.value.trim();
                if (value !== '') {
                    await createChat(value);
                    inputSearch.value = '';
                }
            }
        }
    }
});

const inputSearch = new InputMessage('input', {
    attr: { placeholder: 'Поиск', name: 'search'}
})

const inputMessage = new InputMessage('input', {
    attr: {name: 'message', id: 'form-messager'},
})

export default class ChatPage extends Block {
    constructor() {
        super('main', {
            profile_btn: button,
            input_search: inputSearch,
            create_chat_btn: createChatBtn,
            input_message: inputMessage,
            attr: {class: 'chat-container'}
        });
        Store.on('update', this.updateProps.bind(this));
        this.updateProps();
    };
    updateProps(): void {
        const chats = Store.getState().chats;
        if (!chats) return;

        const updatedChat = chats.length > 0 ? chats?.map((chat: GetChatResponse) => new ChatItem('div', {
                avatarLink: chat.avatar,
                title: chat.title || '',
                events: {
                    click: async (e: Event) => {
                        e.preventDefault();
                        await getTokenChat({chatId: chat.id});
                        this.updatePropsMessager();
                        Store.set({ chatId: chat.id });
                    }
                }
            })
        ) : undefined;

        this.updatePropsMessager();

        this.setProps({
            chat_items: updatedChat || [],
        })
    }
    async updatePropsMessager(chatId?: number) {
        const chatID = chatId || Store.getState().chatId;
        const activeChat = Store.getState().chats?.find((item) => item.id === chatID);
        if (chatID && activeChat) {
            const added_users_to_chat = await this.getAddedUsersToChat(chatID);
            const messagesChat = Store.getState().messages;
            const userId = Store.getState().user?.id;
            this.setProps({
                messager: new ChatMessager('div', {
                    name: activeChat.title || 'test',
                    input_message: inputMessage,
                    round_button: roundButton,
                    input_add_user_for_chat: input_add_user_for_chat,
                    button_add_user_for_chat: this.createAddUserButton(),
                    added_users_to_chat: added_users_to_chat,
                    ...(messagesChat && { message_items: messagesChat.map(item => new ItemMessage('div',
                    { text_message: item.content, isYou: item.id === userId ? userId : null, attr: {class: item.id === userId ? 'is-you' : ''}}))})
                })
            })
        }
    }
    async getAddedUsersToChat(chatId: number) {
        if (chatId) {
            const added_users_to_chat = await getChatUsers({id: chatId});
            return  added_users_to_chat.map((user: GetChatUsersResponse) => new UsersListChat('div', {
                    text: user.first_name,
                    del_button: new Button('button', {
                        children: '-',
                        events: {
                            click: async () => {
                                await deleteUserFromChat({chatId: chatId, users: [Number(user.id)]});
                                const updatedUsers = await this.getAddedUsersToChat(chatId);
                                const activeChat = Store.getState().chats?.find((item) => item.id === chatId);
                                const messagesChat = Store.getState().messages;
                                const userId = Store.getState().user?.id;

                                if (activeChat) {
                                    this.setProps({
                                        messager: new ChatMessager('div', {
                                            name: activeChat.title || 'test',
                                            input_message: inputMessage,
                                            round_button: roundButton,
                                            input_add_user_for_chat: input_add_user_for_chat,
                                            button_add_user_for_chat: this.createAddUserButton(),
                                            added_users_to_chat: updatedUsers,
                                            ...(messagesChat && { message_items: messagesChat.map(item => new ItemMessage('div',
                                            { text_message: item.content, isYou: item.id === userId ? userId : null}))})
                                        })
                                    })
                                }
                            }
                        },
                        attr: { class: 'add_user_for_chat'}
                    }
                ),
            })) || [];
        }
    }
    createAddUserButton() {
        return new Button('button', {
                children: '+',
                events: {
                    click: async (e: Event) => {
                        e.preventDefault();
                        const form = document.querySelector('#form_add_user') as HTMLFormElement;
                        const inputIdUser = form?.querySelector('input');
                        if (inputIdUser) {
                            const value = inputIdUser.value.trim();
                            const chatId = Store.getState().chatId;
                            if (value !== '' && chatId) {
                                await addUserToChat({chatId: chatId, users: [Number(value)]});
                                inputIdUser.value = '';
                                const updatedUsers = await this.getAddedUsersToChat(chatId);
                                const activeChat = Store.getState().chats?.find((item) => item.id === chatId);
                                if (activeChat) {
                                    this.setProps({
                                        messager: new ChatMessager('div', {
                                            name: activeChat.title || 'test',
                                            input_message: inputMessage,
                                            round_button: roundButton,
                                            input_add_user_for_chat: input_add_user_for_chat,
                                            button_add_user_for_chat: this.createAddUserButton(),
                                            added_users_to_chat: updatedUsers
                                        })
                                    })
                                }
                            }
                        }
                }
                },
                attr: { class: 'add_user_for_chat'}
            }
        );
    }
    render() {
        return this.compile(template);
    }
}
