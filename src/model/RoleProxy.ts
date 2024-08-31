import { Proxy } from "@puremvc/puremvc-typescript-multicore-framework";
import Role from "./valueObject/Role";
import { ApplicationConstants } from "../ApplicationConstants";

export default class RoleProxy extends Proxy {

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
