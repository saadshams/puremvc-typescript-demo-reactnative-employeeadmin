//
//  UserVO.ts
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { DeptEnum } from "../enum/DeptEnum";
import { RoleEnum } from "../enum/RoleEnum";

export class UserVO {
  public username: string;
  public first: string;
  public last: string;
  public email: string;
  public password: string;
  public confirm: string = "";
  public department: DeptEnum;
  public roles: RoleEnum[] = [];

  constructor(username = "", first = "", last = "", email = "", password = "", department = DeptEnum.NONE_SELECTED) {
    this.username = username;
    this.first = first;
    this.last = last;
    this.email = email;
    this.password = password;
    this.confirm = password;
    this.department = department;
  }

  static validate(user: UserVO): boolean {
    return UserVO.getValidationError(user) === "";
  }

  static getValidationError(user: UserVO): string {
    if (user.first.trim().length === 0) {
      return "First name is required.";
    }

    if (user.last.trim().length === 0) {
      return "Last name is required.";
    }

    if (user.email.trim().length === 0) {
      return "Email is required.";
    }

    if (user.username.trim().length === 0) {
      return "Username is required.";
    }

    if (user.password.trim().length === 0) {
      return "Password is required.";
    }

    if (user.confirm.trim().length === 0) {
      return "Confirm password is required.";
    }

    if (user.department === DeptEnum.NONE_SELECTED) {
      return "Please select a department.";
    }

    if (!user.roles || user.roles.length === 0) {
      return "Role is required.";
    }

    if (user.password !== user.confirm) {
      return "Password and confirm password must match.";
    }

    return "";
  }

}
