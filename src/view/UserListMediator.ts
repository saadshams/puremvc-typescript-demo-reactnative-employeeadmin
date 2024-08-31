import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import UserProxy from "../model/UserProxy";
import { ApplicationConstants } from "../ApplicationConstants";

export class UserListMediator extends Mediator {

  public static NAME = "UserListMediator";

  private emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  private listeners: EmitterSubscription[] = [];
  private userProxy: UserProxy | undefined;

  constructor(component: any) {
    super(UserListMediator.NAME, component);
  }

  public async onRegister() {
    this.listeners.push(this.emitter.addListener(ApplicationConstants.UNMOUNT, event => this.onUnmounted(event)));

    this.userProxy = this.facade.retrieveProxy(UserProxy.NAME) as UserProxy;
    try {
      this.component.setUsers(await this.userProxy?.findAllUsers());
    } catch(error) {
      console.log(error);
    }
  }

  public onRemove() {
    this.listeners.forEach(listener => listener.remove());
  }

  private onUnmounted(event: any) {
    if (event.name === ApplicationConstants.USER_LIST) {
      this.facade.removeMediator(UserListMediator.NAME);
    }
  }

  public get component() { return this.viewComponent }

}
