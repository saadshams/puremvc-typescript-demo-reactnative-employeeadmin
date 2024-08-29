import {Proxy} from "@puremvc/puremvc-typescript-multicore-framework";
import { IRole, Role } from "./valueObject/Role";
import { Platform } from "react-native";

export class RoleProxy extends Proxy {

  public static NAME = "RoleProxy";

  constructor() {
    super(RoleProxy.NAME, null);
  }

  public async findAllRoles(): Promise<Role[]> {
   const response = await fetch(Platform.OS === "android" ? "http://10.0.2.2/roles" : "http://127.0.0.1/roles", {method: "GET"});
   if (response.status === 200) {
     const json = await response.json();
     const roles = json.map((role: IRole) => Role.fromJson(role))
     roles.unshift(Role.NONE_SELECTED);
     return roles;
   } else {
     const error = await response.json();
     throw new Error(error.message);
   }
  }

  public async findRolesById(id: number) {
    const response = await fetch(Platform.OS === "android" ? `http://10.0.2.2/${id}/roles` : `http://127.0.0.1/${id}/roles`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return json.map((role: IRole) => Role.fromJson(role));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  public async updateRolesById(id: number, roles: [Role]) {
    const response = await fetch(Platform.OS === "android" ? `http://10.0.2.2/${id}/roles` : `http://127.0.0.1/${id}/roles`, {method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(roles)
    });

    if (response.status === 200) {
      const json = await response.json();
      return json.map((role: IRole) => Role.fromJson(role));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }
}
