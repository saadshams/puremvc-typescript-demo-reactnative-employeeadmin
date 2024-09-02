import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import { UserProxy } from "../model/UserProxy";
import { USER_LIST_UNMOUNTED } from "../ApplicationConstants";
import { IUserList } from "./components/UserList";

export class UserListMediator extends Mediator {

  public static NAME = "UserListMediator";

  private emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  private listeners: EmitterSubscription[] = [];
  private userProxy!: UserProxy;

  constructor(component: any) {
    super(UserListMediator.NAME, component);
    this.listeners.push(this.emitter.addListener(USER_LIST_UNMOUNTED, event => this.onUnmounted(event)));
  }

  public async onRegister() {
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
    event === USER_LIST_UNMOUNTED && this.facade.removeMediator(UserListMediator.NAME);
  }

  public get component(): IUserList {
    return this.viewComponent
  }

}
