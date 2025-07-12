export const template = `
    <div class="chat-list">
        <form class="chat-list-form" id="chat_form_create">
            {{{profile_btn}}}
            {{{input_search}}}
            <hr class="chat-list__line" />
            {{{create_chat_btn}}}
            <div class="chat-list__items">
                {{{chat_items}}}
            </div>
        </form>

    </div>
    {{{messager}}}
`;
