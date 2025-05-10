import InputMessage from '../../components/InputMessage/index';
import Page from '../../services/Page';
import ChatTemplate from './ChatTemplate';
import ChatPageController from './ChatController';

export default class ChatPage extends Page {
    getContent() {
        const inputSearch = new InputMessage('input', {
            attr: { placeholder: 'Поиск', name: 'search'}
        })

        const inputMessage = new InputMessage('input', {attr: {name: 'message'}})

        const chatTemplate = new ChatTemplate('main',{
            input_search: inputSearch,
            input_message: inputMessage,
            first_name: 'Иван',
            second_name: 'Иванов',
            attr: {class: 'chat-container'}
        });

        return chatTemplate;
    }
}

// Функция для отображения страницы чата
export const renderChatPage = (app: HTMLElement | null) => {
    if (app) app.textContent = '';
    const authPage = new ChatPage();
    authPage.render();
    new ChatPageController();
};
