//
//  UserListMediator.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import { UserProxy } from "../model/UserProxy";
import { IUserList } from "./components/UserList";

export class UserListMediator extends Mediator {

  public static NAME = "UserListMediator";

  private userProxy!: UserProxy;

  constructor(component: any) {
    super(UserListMediator.NAME, component);
  }

  public async onRegister() {
    this.userProxy = this.facade.retrieveProxy(UserProxy.NAME) as UserProxy;
    try {
      this.component.setUsers(await this.userProxy.findAllUsers());
    } catch(error) {
      console.log(error);
    }
  }

  public get component(): IUserList {
    return this.viewComponent
  }

}
