export const BASE_URL = 'http://192.168.1.110';

export const ENDPOINTS = {
    USERS: '/users',
    USER_BY_ID: (id: number) => `/users/${id}`,
    DEPARTMENTS: "/departments",
    ROLES: "/roles",
};