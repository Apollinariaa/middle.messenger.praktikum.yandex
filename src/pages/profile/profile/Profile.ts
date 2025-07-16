export const template = `
{{{back_button}}}
<h1 class="profile-block__title">Профиль</h1>

<div class="profile-block__avatar-block">
    <img src={{profile_image_src}} class="profile-block__avatar-block__img" alt="avatar"/>
</div>

<div class="profile-block__input-form">
    {{{input_form}}}
</div>

<div class="profile-block__buttons">
    {{{action_buttons}}}
</div>`;
