export const template = `
<div class="chat-list">
    {{{input_search}}}
    <hr class="chat-list__line" />
    <ul class="chat-list__items">
        {{{chat_items}}}
    </ul>
</div>
<div class="chat-window">
    <div class="chat-window__user-info">
        <img src="/avatar.png" alt="logo user" class="chat-window__user-icon">
        <span class="chat-window__user-name">{{{first_name}}} {{{second_name}}}</span>
    </div>
    <div class="chat-window__messages">
        {{{message_items}}}
    </div>

    <form class="chat-window__form chat-form" id="chat_form">
        <div class="chat-form__clip">
            <img src="/clip.svg" alt="clip" class="chat-form__clip-icon">
        </div>
        {{{input_message}}}
        <button class="chat-form__send-button" type="submit">
            <img src="/arrow.svg" alt="arrow" class="chat-form__arrow-icon">
        </button>
    </form>
</div>
`;
