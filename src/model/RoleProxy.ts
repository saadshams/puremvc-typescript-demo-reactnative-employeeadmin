//
//  RoleProxy.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { Proxy } from "@puremvc/puremvc-typescript-multicore-framework";
import { ApplicationConstants } from "../ApplicationConstants";
import { Role } from "./valueObject/Role";

export class RoleProxy extends Proxy {

  public static NAME = "RoleProxy";

  constructor() {
    super(RoleProxy.NAME, null);
  }

  public async findAllRoles(): Promise<Role[]> {
   const response = await fetch(`${ApplicationConstants.API_URL}/roles`, {method: "GET"});
   if (response.status === 200) {
     const json = await response.json();
     return json.map((role: Role) => Role.fromJson(role));
   } else {
     const error = await response.json();
     throw new Error(error.message);
   }
  }

  public async findRolesById(id: number) {
    const response = await fetch(`${ApplicationConstants.API_URL}/users/${id}/roles`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return json.map((role: Role) => Role.fromJson(role));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  public async updateRolesById(id: number, roles: [Role]) {
    const response = await fetch(`${ApplicationConstants.API_URL}/users/${id}/roles`, {method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(roles)
    });

    if (response.status === 200) {
      const json = await response.json();
      return json.map((role: Role) => Role.fromJson(role));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }
}
