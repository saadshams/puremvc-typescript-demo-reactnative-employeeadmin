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

  public findUserByUsername(username: string): UserVO | undefined {
    const found = this.data.find((currentUser: UserVO) => currentUser.username === username);
    return found ? ({ ...found } as UserVO) : undefined;
  }

  public save(user: UserVO) {
    this.data.push({ ...user } as UserVO);
  }

  public update(user: UserVO) {
    const index = this.data.findIndex((currentUser: UserVO) => currentUser.id === user.id);
    if (index !== -1)
      this.data[index] = { ...user } as UserVO;
  }

}
