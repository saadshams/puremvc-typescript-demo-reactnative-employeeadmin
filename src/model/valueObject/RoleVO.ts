//
//  RoleVO.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { RoleEnum } from "../enum/RoleEnum";

export class RoleVO {

  public readonly username: string;
  public roles: RoleEnum[];

  constructor(username: string, roles: RoleEnum[]) {
    this.username = username;
    this.roles = roles;
  }

  public get key(): string { return `role_${this.username}` }

}
