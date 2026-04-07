//
//  UserFormMediator.ts
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import { RoleProxy } from "../model/RoleProxy";
import { IUserRole } from "./components/UserRole";

export class UserRoleMediator extends Mediator {
  public static NAME = "UserRoleMediator";

  private emitter: NativeEventEmitter | null = null;
  private listeners: EmitterSubscription[] = [];
  private roleProxy!: RoleProxy;

  constructor(component: any) {
    super(UserRoleMediator.NAME, component);
  }

  public async onRegister() {
    this.roleProxy = this.facade.retrieveProxy(RoleProxy.NAME) as RoleProxy;

    const nativeModule = NativeModules.employeeadmin;

    if (!nativeModule) {
      console.log("NativeModules.employeeadmin is missing");
      return;
    }

    this.emitter = new NativeEventEmitter(nativeModule);

    this.listeners.push(
      this.emitter.addListener(this.component.USER_ROLE_FETCH, event => this.onSelect(event))
    );
  }

  public onRemove() {
    this.listeners.forEach(listener => listener.remove());
    this.listeners = [];
  }

  private async onSelect(event: any) {
    try {
      const roles = this.roleProxy.findRolesByUsername(event.id);
      if (roles != null) this.component.setData(roles);
    } catch (error) {
      console.log(error);
    }
  }

  public get component(): IUserRole {
    return this.viewComponent;
  }
}