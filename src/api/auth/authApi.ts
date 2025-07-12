import HTTPTransport from '../../services/HTTPTransport';
import { BASE_URL, DefaultResponse, ErrorResponse, options } from '../types';
import { UserInfo } from '../user/types';
import { SignInRequest, SignUpRequest, SignUpResponse } from './types';

export const pathsAuthApi = {
    signin: `${BASE_URL}/auth/signin`,
    signup: `${BASE_URL}/auth/signup`,
    getInfoUser: `${BASE_URL}/auth/user`,
    logout: `${BASE_URL}/auth/logout`,
}

class AuthAPI {
    async singin(data: SignInRequest): Promise<DefaultResponse> {
        return HTTPTransport.post(pathsAuthApi.signin, {...options, data: data as unknown as Record<string, unknown>})
    }

    async logout(): Promise<DefaultResponse> {
        return HTTPTransport.post(pathsAuthApi.logout, options)
    }

    async singup(data: SignUpRequest): Promise<SignUpResponse> {
        return HTTPTransport.post(pathsAuthApi.signup, {...options, data: data as unknown as Record<string, unknown>})
    }

    async getUserInfo(): Promise<UserInfo | ErrorResponse> {
        return HTTPTransport.get(pathsAuthApi.getInfoUser, options)
    }
}

export default new AuthAPI();
