export const template = `
    <div class="chat-avatar">
        {{#if avatarLink}}
            <img src="{{avatarLink}}" alt="avatar-chat" />
        {{else}}
            <img src="/avatar.png" alt="logo user" class="avatar-default">
        {{/if}}
    </div>
    <h4 class="chat-info__title">{{title}}</h4>
`;
