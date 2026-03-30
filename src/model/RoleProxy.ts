//
//  RoleProxy.ts
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { Proxy } from "@puremvc/puremvc-typescript-multicore-framework";
import { RoleVO } from "./valueObject/RoleVO";
import { RoleEnum } from "./enum/RoleEnum";

export class RoleProxy extends Proxy {

  public static NAME = "RoleProxy";

  constructor() {
    super(RoleProxy.NAME, []);
  }

  public findAllRoles(): RoleVO[] {
    return this.data;
  }

  public findRolesByUsername(username: string): RoleEnum[] | null {
    const index = this.data.findIndex((role: RoleVO) => role.username === username);
    return (index >= 0) ? (this.data[index] as RoleVO).roles : null;
  }

  public save(role: RoleVO) {
    this.data.push(role);
  }

  public updateRolesByUsername(username: string, roles: [RoleEnum]): RoleEnum[] | null {
    const index = this.data.findIndex((role: RoleVO) => role.username === username);
    return (index >= 0) ? (this.data[index] as RoleVO).roles : null;
  }
}
