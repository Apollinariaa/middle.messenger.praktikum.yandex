import HTTPTransport from '../../services/HTTPTransport';
import { BASE_URL, DefaultResponse, options } from '../types';
import { ChangeUserPasswordRequest, ChangeUserProfileRequest, UserInfo } from './types';

export const pathsUserApi = {
    changeUserProfile: `${BASE_URL}/user/profile`,
    changeUserAvatar: `${BASE_URL}/user/profile/avatar`,
    changeUserPassword: `${BASE_URL}/user/password`,
    userSearch: `${BASE_URL}/user/search`,
}

class UserAPI {
    async changeUserData(data: ChangeUserProfileRequest): Promise<UserInfo> {
        return HTTPTransport.put(pathsUserApi.changeUserProfile, {...options, data: data as unknown as Record<string, unknown>})
    }

    async changeUserAvatar(data: File): Promise<UserInfo> {
        const formData = new FormData();
        formData.append('avatar', data);
        return HTTPTransport.put(pathsUserApi.changeUserAvatar, {data: formData as unknown as Record<string, unknown>})
    }

    async changeUserPassword(data: ChangeUserPasswordRequest): Promise<DefaultResponse> {
        return HTTPTransport.put(pathsUserApi.changeUserPassword, {...options, data: data as unknown as Record<string, unknown>})
    }

    async userSearch(data: {login: string}): Promise<UserInfo[]> {
        return HTTPTransport.post(pathsUserApi.userSearch, {...options, data})
    }
}

export default new UserAPI();
