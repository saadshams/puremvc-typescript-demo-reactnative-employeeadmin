//
//  UserFormMediator.ts
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import { UserProxy } from "../model/UserProxy";
import { IUserForm } from "./components/UserForm";

export class UserFormMediator extends Mediator {

  public static NAME = "UserFormMediator";

  private emitter = new NativeEventEmitter(NativeModules.employeeadmin);
  private listeners: EmitterSubscription[] = [];
  private userProxy!: UserProxy;

  constructor(component: any) {
    super(UserFormMediator.NAME, component);
  }

  public async onRegister() {
    this.userProxy = this.facade.retrieveProxy(UserProxy.NAME) as UserProxy;
    this.listeners.push(this.emitter.addListener(this.component.USER_FETCH, event => this.onFetch(event)));
    this.listeners.push(this.emitter.addListener(this.component.USER_SAVE, event => this.onSave(event)));
    this.listeners.push(this.emitter.addListener(this.component.USER_UPDATE, event => this.onUpdate(event)));
  }

  public onRemove() {
    this.listeners.forEach(listener => listener.remove());
  }

  private async onFetch(event: any) {
    try {
      const user = this.userProxy.findUserByUsername(event.id);
      if (user)
        this.component.setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  private async onSave(event: any) {
    try {
      this.userProxy.save(event.user);
      this.component.goBack(event.user);
    } catch (error) {
      console.log(error);
    }
  }

  private async onUpdate(event: any) {
    try {
      this.userProxy.update(event.user);
      this.component.goBack(event.user);
    } catch (error) {
      console.log(error);
    }
  }

  public get component() : IUserForm {
    return this.viewComponent
  }

}
