// Логин: 3-20 символов, латиница, цифры, без пробелов и спецсимволов
export const loginRegex = /^(?![0-9]+$)[a-zA-Z0-9_-]{3,20}$/;

// Пароль: 8-40 символов, хотя бы одна заглавная буква и цифра
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

// Почта: латиница, цифры, спецсимволы (дефиса и подчёркивания)
// обязательно - @ и точка после неё, но перед точкой обязательно должны быть буквы.
export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;

// Телефон: от 10 до 15 символов, состоит из цифр, может начинается с плюса
export const phoneRegex = /^\+?\d{10,15}$/;

// Имя: первая буква - заглавная, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
export const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё-]*$/;

// Проверка, что строка не пустая
export const nonEmptyRegex = /^(?!\s*$).+/;


export const ErrorMessage = {
    REQUEST: 'Обязательное поле',
    INCORRECT_FORMAT: 'Не корректный формат ввода',
}

export enum RegexKey {
    LOGIN = 'login',
    PASSWORD = 'password',
    EMAIL = 'email',
    PHONE = 'phone',
    FIRST_NAME = 'first_name',
    SECOND_NAME = 'second_name',
    DISPLAY_NAME = 'display_name',
    DEFAULT = 'default',
    NEW_PASSWORD = 'newPassword',
    OLD_PASSWORD = 'oldPassword',
}

export const regexMap: Record<RegexKey, RegExp> = {
    [RegexKey.LOGIN]: loginRegex,
    [RegexKey.PASSWORD]: passwordRegex,
    [RegexKey.EMAIL]: emailRegex,
    [RegexKey.PHONE]: phoneRegex,
    [RegexKey.FIRST_NAME]: nameRegex,
    [RegexKey.SECOND_NAME]: nameRegex,
    [RegexKey.DEFAULT]: nonEmptyRegex,
    [RegexKey.NEW_PASSWORD]: passwordRegex,
    [RegexKey.OLD_PASSWORD]: passwordRegex,
    [RegexKey.DISPLAY_NAME]: loginRegex
};

export enum PagesNames {
  login = 'login',
  chats = 'chats',
  registration = 'registration',
  profile = 'profile',
  changeData = 'changeData',
  changePassword = 'changePassword',
  notFound = 'notFound',
  serverError = 'serverError',
}

export const RoutesLinks: Record<PagesNames, string> = {
  [PagesNames.login]: '/',
  [PagesNames.profile]: '/profile',
  [PagesNames.changeData]: '/settings',
  [PagesNames.changePassword]: '/change-password',
  [PagesNames.registration]: '/sign-up',
  [PagesNames.chats]: '/messenger',
  [PagesNames.notFound]: '/404',
  [PagesNames.serverError]: '/500',
};
