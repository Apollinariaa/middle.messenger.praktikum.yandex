import { BASE_WEB_SOCKET_URL } from '../api/types';
import EventBus from './EventBus';
import Store from './Store';

class WebSocketForChat extends EventBus {
    private static __instance: WebSocketForChat | null = null;
    private socket: WebSocket | null = null;
    public isReady: boolean = false;
    public pingInterval: NodeJS.Timeout | null = null;

    constructor() {
        if (WebSocketForChat.__instance) {
            return WebSocketForChat.__instance;
        }
        super();
        WebSocketForChat.__instance = this;
    }

    init(userID: number, chatID: number, token: string) {
        this.socket = new WebSocket(
        `${BASE_WEB_SOCKET_URL}/${userID}/${chatID}/${token}`
        );

        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this.isReady = true;
            this.getOlderMessages();
            this.sendPing();
        });

        this.socket.addEventListener('close', () => {
            if (this.pingInterval) {
                clearInterval(this.pingInterval);
            }
            console.log('Соединение закрыто');
        });

        this.socket.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'message') {
                    this.getOlderMessages();
                }
                if (Array.isArray(data)) {
                    Store.set({ messages: data });
                }
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });

        this.socket.addEventListener('error', () => {
            console.log('Ошибка');
        });
    }

    getOlderMessages() {
        //getChats.getInfo();
        this.socket?.send(
        JSON.stringify({
            content: '0',
            type: 'get old'
        })
        );
    }

    sendPing() {
        this.pingInterval = setInterval(() => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({
                    type: 'ping'
                })
            );
        } else {
            console.error('Соединение не открыто.');
        }
        }, 3000);
    }

    sendMessage(message: string) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({
                content: message,
                type: 'message'
                })
            );
        } else {
            console.error('Соединение не открыто.');
        }
    }

    closeConnection() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default new WebSocketForChat();
