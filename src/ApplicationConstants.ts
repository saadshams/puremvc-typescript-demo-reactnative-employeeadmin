import { Platform } from "react-native";
import User from "./model/valueObject/User";

export const USER_LIST_MOUNTED = "userListMounted";
export const USER_FORM_MOUNTED = "userFormMounted";
export const USER_ROLE_MOUNTED = "userRoleMounted";

export const USER_LIST_UNMOUNTED = "userListUnmounted";
export const USER_FORM_UNMOUNTED = "userFormUnmounted";
export const USER_ROLE_UNMOUNTED = "userRoleUnmounted";

export const API_URL = Platform.OS === "android" ? "http://10.0.2.2" : "http://127.0.0.1";

export type ParamList = {
  UserList: {user: User};
  UserForm: {user: User};
  UserRole: {user: User};
};
