import Store from '../../services/Store';
import Router from '../../services/router/Router';
import { RoutesLinks } from '../../utils/regex';
import { UserInfo } from '../user/types';
import AuthAPI from './authApi';
import { SignInRequest, SignUpRequest } from './types';

export const infoUser = async () => {
    await AuthAPI.getUserInfo().then(async (user) => {
        Store.set({ user: user as UserInfo });
        localStorage.isAuth = true;
    }).catch(error => {
        Store.reset();
        localStorage.isAuth = false;
        if (error instanceof Error) {
            console.error(error.message || error);
        }
    });
};

export const loginUser = async (formData: SignInRequest) => {
    await AuthAPI.singin(formData).then(async () => {
        await infoUser();
        Router.getInstance().go(RoutesLinks.chats)
    });
};

export const registrationUser = async (formData: SignUpRequest) => {
    await AuthAPI.singup(formData).then(async () => {
        await infoUser();
        Router.getInstance().go(RoutesLinks.chats);
    }).catch((error) => {
        throw error;
    });

};

export const logoutUser = async () => {
    await AuthAPI.logout().then(async () => {
        Router.getInstance().go(RoutesLinks.login);
        localStorage.isAuth = false;
        localStorage.setItem('store', '');
        Store.reset();
    }).catch((data) => {throw new Error(data.reason);});
};
