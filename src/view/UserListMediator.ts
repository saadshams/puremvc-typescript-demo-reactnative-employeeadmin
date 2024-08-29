import {Mediator} from "@puremvc/puremvc-typescript-multicore-framework";
import {UserProxy} from "../model/UserProxy";
import { ApplicationConstants } from "../ApplicationConstants";
import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";

export class UserListMediator extends Mediator {

  public static NAME = "UserListMediator";

  private userProxy: UserProxy | undefined;

  private listener: EmitterSubscription | undefined;

  constructor(component: any) {
    super(UserListMediator.NAME, component);
  }

  public onRegister() {
    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    this.listener = emitter.addListener(ApplicationConstants.UNMOUNTED, this.handlers.onUnmounted);

    this.userProxy = this.facade.retrieveProxy(UserProxy.NAME) as UserProxy;
    this.userProxy.findAllUsers()
      .then(users => this.component.setUsers(users))
      .catch(console.log);
  }

  private handlers = {
    onUnmounted: (event: any) => this.onUnmounted(event)
  }

  private onUnmounted(event: any) {
    if (event.name === ApplicationConstants.USER_LIST) {
      this.facade.removeMediator(UserListMediator.NAME);
      this.listener?.remove();
    }
  }

  public get component() { return this.viewComponent }

}
