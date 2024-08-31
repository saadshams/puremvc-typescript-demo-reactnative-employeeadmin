import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import UserProxy from "../model/UserProxy";
import { ApplicationConstants } from "../ApplicationConstants";

export class UserFormMediator extends Mediator {

  public static NAME = "UserFormMediator";

  private emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  private listeners: EmitterSubscription[] = [];
  private userProxy: UserProxy | undefined;

  constructor(component: any) {
    super(UserFormMediator.NAME, component);
  }

  public async onRegister() {
    this.listeners.push(this.emitter.addListener(ApplicationConstants.UNMOUNT, event => this.onUnmount(event)));
    this.listeners.push(this.emitter.addListener(ApplicationConstants.USER_SELECTED, event => this.onSelect(event)));

    this.userProxy = this.facade.retrieveProxy(UserProxy.NAME) as UserProxy;
    try {
      this.component.setDepartments(await this.userProxy?.findAllDepartments())
    } catch(error) {
      console.log(error);
    }
  }

  public onRemove() {
    this.listeners.forEach(listener => listener.remove());
  }

  private onUnmount(event: any) {
    if (event.name === ApplicationConstants.USER_FORM) {
      this.facade.removeMediator(UserFormMediator.NAME);
    }
  }

  private async onSelect(event: any) {
    try {
      this.component.setUser(await this.userProxy?.findUserById(event.id));
    } catch (error) {
      console.log(error);
    }
  }

  public get component() { return this.viewComponent }

}
