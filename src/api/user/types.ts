export interface UserInfo {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}


export interface ChangeUserProfileRequest {
    first_name?: string;
    second_name?: string;
    display_name?: string;
    login?: string;
    email?: string;
    phone?: string;
}

export interface ChangeUserPasswordRequest {
    oldPassword: string;
    newPassword: string;
}
