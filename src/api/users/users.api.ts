import { apiClient } from '../client';
import { BASE_URL, ENDPOINTS } from '../endpoints';
import { User } from './users.types';

type UserInputBase = Omit<User, 'id' | 'password'>;
export type CreateUserPayload = UserInputBase & { password: string };
export type UpdateUserPayload = UserInputBase & Partial<Pick<User, 'password'>>;

export const getUsers = async (): Promise<User[]> => {
    return apiClient<User[]>(`${BASE_URL}${ENDPOINTS.USERS}`);
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
    return apiClient<User>(`${BASE_URL}${ENDPOINTS.USERS}`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

export const updateUser = async (id: number, payload: UpdateUserPayload): Promise<User> => {
    return apiClient<User>(`${BASE_URL}${ENDPOINTS.USER_BY_ID(id)}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
};