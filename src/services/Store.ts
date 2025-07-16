import { GetChatResponse } from '../api/chat/types';
import { UserInfo } from '../api/user/types';
import EventBus from './EventBus';

interface StoreProps {
    user?: UserInfo | null;
    chats?: GetChatResponse[] | undefined;
    messages?: GetChatResponse[] | [];
    tokenChat?: string;
    chatId?: number | null;
}

class Store extends EventBus {
    private _state: StoreProps = {
        user: null,
        chats: undefined,
        messages: [],
        tokenChat: '',
        chatId: null,
    };

    private static _instance: Store;
    private initialState: StoreProps = { ...this._state };

    constructor() {
        if (Store._instance) {
            return Store._instance;
        }
        super();

        const savedState = localStorage.getItem('store');
        if (savedState) {
            try {
                this._state = JSON.parse(savedState);
            } catch (e) {
                console.warn('Не удалось загрузить состояние из localStorage', e);
            }
        }

        Store._instance = this;
    }

    static getInstance() {
        if (!Store._instance) {
            return Store._instance = new Store();
        }
        return Store._instance;
    }

    public getState(): StoreProps {
        return this._state;
    }

    public set(nextState: StoreProps) {
        const prevState = { ...this._state };

        this._state = { ...this._state, ...nextState };
        this.emit('update', prevState, nextState);
        localStorage.setItem('store', JSON.stringify(this._state));
    }
    public reset() {
        const prevState = { ...this._state };
        this._state = { ...this.initialState };
        this.emit('update', prevState, this._state);
        console.log('State has been reset:', this._state);
    }
}

export default new Store();
