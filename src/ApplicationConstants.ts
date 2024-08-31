import { Platform } from "react-native";
import User from "./model/valueObject/User";

export class ApplicationConstants {
  static MOUNT = "mount";
  static UNMOUNT = "unmount";
  static USER_LIST = "UserList";
  static USER_FORM = "UserForm";
  static USER_ROLE = "UserRole";

  static USER_SELECTED = "userSelected";

  static API_URL = Platform.OS === "android" ? "http://10.0.2.2" : "http://127.0.0.1";
}

export type ParamList = {
  UserList: undefined;
  UserForm: {user: User};
  UserRole: {user: User};
};
