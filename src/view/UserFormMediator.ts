import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import { UserProxy } from "../model/UserProxy";
import { IUserForm } from "./components/UserForm";

export class UserFormMediator extends Mediator {

  public static NAME = "UserFormMediator";

  private emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  private listeners: EmitterSubscription[] = [];
  private userProxy!: UserProxy;

  constructor(component: any) {
    super(UserFormMediator.NAME, component);
  }

  public async onRegister() {
    this.listeners.push(this.emitter.addListener(this.component.USER_FETCH, event => this.onFetch(event)));
    this.listeners.push(this.emitter.addListener(this.component.USER_SAVE, event => this.onSave(event)));
    this.listeners.push(this.emitter.addListener(this.component.USER_UPDATE, event => this.onUpdate(event)));

    this.userProxy = this.facade.retrieveProxy(UserProxy.NAME) as UserProxy;
    try {
      this.component.setDepartments(await this.userProxy.findAllDepartments())
    } catch(error) {
      console.log(error);
    }
  }

  public onRemove() {
    this.listeners.forEach(listener => listener.remove());
  }

  private async onFetch(event: any) {
    try {
      this.component.setUser(await this.userProxy.findUserById(event.id));
      console.log("user set");
    } catch (error) {
      console.log(error);
    }
  }

  private async onSave(event: any) {
    try {
      this.component.goBack(await this.userProxy.save(event.user));
    } catch (error) {
      console.log(error);
    }
  }

  private async onUpdate(event: any) {
    try {
      this.component.goBack(await this.userProxy.update(event.user));
    } catch (error) {
      console.log(error);
    }
  }

  public get component() : IUserForm {
    return this.viewComponent
  }

}
