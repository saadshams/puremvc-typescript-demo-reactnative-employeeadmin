import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { ApplicationConstants } from "../ApplicationConstants";
import { RoleProxy } from "../model/RoleProxy";

export class UserRoleMediator extends Mediator {

  public static get NAME() { return "UserRoleMediator" }

  private roleProxy: RoleProxy | undefined;

  private listener: EmitterSubscription | undefined;

  constructor(component: any) {
    super(UserRoleMediator.NAME, component);
  }

  onRegister() {
    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    this.listener = emitter.addListener(ApplicationConstants.UNMOUNTED, this.handlers.onUnmounted)

    this.roleProxy = this.facade.retrieveProxy(RoleProxy.NAME) as RoleProxy;
    this.roleProxy.findAllRoles()
      .then(roles => this.viewComponent.setRoles(roles))
      .catch(console.log);
  }

  private handlers = {
    onUnmounted: (event: any) => this.onUnmounted(event)
  }

  private onUnmounted(event: any) {
    if (event.name === ApplicationConstants.USER_LIST) {
      this.facade.removeMediator(UserRoleMediator.NAME);
      this.listener?.remove();
    }
  }

  public get component() { return this.viewComponent }

}
