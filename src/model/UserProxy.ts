//
//  UserProxy.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { Proxy } from "@puremvc/puremvc-typescript-multicore-framework";
import { User } from "./valueObject/User";
import { Department } from "./valueObject/Department";
import { ApplicationConstants } from "../ApplicationConstants";

export class UserProxy extends Proxy {

  public static NAME = "UserProxy";

  constructor() {
    super(UserProxy.NAME, null);
  }

  public async findAllUsers(): Promise<User[]> {
    const response = await fetch(`${ApplicationConstants.API_URL}/users`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return json.map((user: User) => new User(user.id, "", user.first, user.last));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  public async findUserById(id: number): Promise<User> {
    const response = await fetch(`${ApplicationConstants.API_URL}/users/${id}`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return User.fromJson(json);
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  async save(user: User) {
    const response = await fetch(`${ApplicationConstants.API_URL}/users`, { method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user)
    });

    if (response.status === 201) {
      const json = await response.json();
      return User.fromJson(json);
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  async update(user: User) {
    const response = await fetch(`${ApplicationConstants.API_URL}/users/${user.id}`, { method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user)
    });

    if (response.status === 200) {
      const json = await response.json();
      return User.fromJson(json);
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  public async findAllDepartments(): Promise<Department[]> {
    const response = await fetch(`${ApplicationConstants.API_URL}/departments`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return json.map((department: Department) => Department.fromJson(department));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

}
