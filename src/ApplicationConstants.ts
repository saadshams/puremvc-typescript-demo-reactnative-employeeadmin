//
//  ApplicationConstants.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { Platform } from "react-native";
import { UserVO } from "./model/valueObject/UserVO";
import type { RoleEnum } from "./model/enum/RoleEnum";

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
  UserList: undefined;
  UserForm: {user: UserVO, roles: RoleEnum[]};
  UserRole: {user: UserVO};
};
