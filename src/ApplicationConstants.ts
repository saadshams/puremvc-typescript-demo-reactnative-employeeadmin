import { Platform } from "react-native";
import { User } from "./model/valueObject/User";

export class ApplicationConstants {
  static USER_LIST_MOUNTED = "userListMounted";
  static USER_FORM_MOUNTED = "userFormMounted";
  static USER_ROLE_MOUNTED = "userRoleMounted";

  static USER_LIST_UNMOUNTED = "userListUnmounted";
  static USER_FORM_UNMOUNTED = "userFormUnmounted";
  static USER_ROLE_UNMOUNTED = "userRoleUnmounted";

  static API_URL = Platform.OS === "android" ? "http://10.0.2.2" : "http://127.0.0.1";
}

export type ParamList = {
  UserList: {user: User};
  UserForm: {user: User};
  UserRole: {user: User};
};
