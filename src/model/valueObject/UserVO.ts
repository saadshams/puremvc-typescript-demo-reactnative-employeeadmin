//
//  UserVO.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { DeptEnum } from "../enum/DeptEnum";

export class UserVO {
  public username: string;
  public first: string;
  public last: string;
  public email: string;
  public password: string;
  public confirm: string = "";
  public department: DeptEnum;

  constructor(username = "", first = "", last = "", email = "", password = "", department = DeptEnum.NONE_SELECTED) {
    this.username = username;
    this.first = first;
    this.last = last;
    this.email = email;
    this.password = password;
    this.confirm = password;
    this.department = department;
  }

  static validate(confirm: string): boolean {
    return false;
  }

}
