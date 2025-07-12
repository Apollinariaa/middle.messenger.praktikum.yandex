export const template = `
    {{#if name}}
        <div class="chat-window__user-info">
            <span class="chat-window__user-name">{{name}}</span>
            <div class="chat-window__wrapper-add-user">
                <form id='form_add_user'>
                    {{{input_add_user_for_chat}}}{{{button_add_user_for_chat}}}
                </form>
                <div>{{{added_users_to_chat}}}</div>
            </div>

        </div>
        <div class="chat-window__messages">
            {{{message_items}}}
        </div>

        <form class="chat-window__form chat-form" id="chat_form_message">
            <div class="chat-form__clip">
                <img src="/clip.svg" alt="clip" class="chat-form__clip-icon">
            </div>
            {{{input_message}}}
            {{{round_button}}}
        </form>
    {{/if}}
`;
