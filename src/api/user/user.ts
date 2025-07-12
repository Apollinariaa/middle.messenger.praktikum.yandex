
import store from '../../services/Store';
import Router from '../../services/router/Router';
import { RoutesLinks } from '../../utils/regex';
import { infoUser } from '../auth/auth';
import { ChangeUserPasswordRequest, ChangeUserProfileRequest, UserInfo } from './types';
import UserAPI from './userApi';

export const changeUserData = async (formData: ChangeUserProfileRequest) => {
    if (Object.keys(formData).length !== 0) {
        await UserAPI.changeUserData(formData).then(async () => {
            await infoUser();
            Router.getInstance().go(RoutesLinks.profile)
        }).catch((error) => {
            throw error;
        });
    }


    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
        throw new Error('Файл не выбран');
    }

    await UserAPI.changeUserAvatar(file).then(async (user) => {
        store.set({ user: user as UserInfo });
        Router.getInstance().go(RoutesLinks.profile)
    }).catch((error) => {
        throw error;
    });
};

export const changeUserPassword = async (formData: ChangeUserPasswordRequest) => {
    await UserAPI.changeUserPassword(formData).then(async () => {
        console.log('changeUserPassword');
        await infoUser();
        Router.getInstance().go(RoutesLinks.profile)
    }).catch((error) => {
        throw error;
    });
};
