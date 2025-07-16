export const template = `
{{{back_button}}}
<h1 class="profile-block__title">Изменение данных</h1>

<form class="profile-block__form" id="change_data_form">
    <div class="profile-block__avatar-block">
        <input type="file" name="{{{code_img}}}" class="block-input__field"  value="{{value_avatar_src}}" accept="image/*">
    </div>
    <div class="profile-block__input-form">
        {{{input_form}}}
    </div>

    {{{submit_button}}}
</form>`;
