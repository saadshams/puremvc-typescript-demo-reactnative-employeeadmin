import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import { UserProxy } from "../model/UserProxy";
import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { ApplicationConstants } from "../ApplicationConstants";

export class UserFormMediator extends Mediator {

  public static NAME = "UserFormMediator";

  private listener: EmitterSubscription | undefined;

  private userProxy: UserProxy | null | undefined;

  constructor(component: any) {
    super(UserFormMediator.NAME, component);
  }

  public onRegister() {
    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    this.listener = emitter.addListener(ApplicationConstants.UNMOUNTED, this.handlers.onUnmounted);

    this.userProxy = this.facade.retrieveProxy(UserProxy.NAME) as UserProxy;
    this.userProxy.findAllDepartments()
      .then(departments => this.component.setDepartments(departments))
      .catch(console.log);
  }

  private handlers = {
    onUnmounted: (event: any) => this.onUnmounted(event)
  }

  private onUnmounted(event: any) {
    if (event.name === ApplicationConstants.USER_FORM) {
      this.facade.removeMediator(UserFormMediator.NAME);
      this.listener?.remove();
    }
  }

  public get component() { return this.viewComponent }

}
