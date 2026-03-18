//
//  UserProxy.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { Proxy } from "@puremvc/puremvc-typescript-multicore-framework";
import { UserVO } from "./valueObject/UserVO";

export class UserProxy extends Proxy {

  public static NAME = "UserProxy";

  constructor() {
    super(UserProxy.NAME, []);
  }

  public findAllUsers(): UserVO[] {
    return this.data;
  }

  public findUserByUsername(username: string): UserVO {
    return this.data.find((user: UserVO) => user.username === username);
  }

  public save(user: UserVO) {
    this.data.push(user);
  }

  public update(user: UserVO) {
    const index = this.data.findIndex((user: UserVO) => user.username === user.username);
    if (index !== -1)
      this.data[index] = user;
  }

}
