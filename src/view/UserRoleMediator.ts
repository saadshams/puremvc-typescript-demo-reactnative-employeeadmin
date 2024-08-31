import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import RoleProxy from "../model/RoleProxy";
import { ApplicationConstants } from "../ApplicationConstants";

export class UserRoleMediator extends Mediator {

  public static NAME = "UserRoleMediator";

  private emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  private listeners: EmitterSubscription[] = [];
  private roleProxy: RoleProxy | undefined;

  constructor(component: any) {
    super(UserRoleMediator.NAME, component);
  }

  public async onRegister() {
    this.listeners.push(this.emitter.addListener(ApplicationConstants.UNMOUNT, event => this.onUnmount(event)));
    this.listeners.push(this.emitter.addListener(ApplicationConstants.USER_SELECTED, event => this.onSelect(event)));

    this.roleProxy = this.facade.retrieveProxy(RoleProxy.NAME) as RoleProxy;
    try {
      this.component.setRoles(await this.roleProxy?.findAllRoles());
    } catch(error) {
      console.log(error);
    }
  }

  public onRemove() {
    this.listeners.forEach(listener => listener.remove());
  }

  private onUnmount(event: any) {
    if (event.name === ApplicationConstants.USER_ROLE) {
      this.facade.removeMediator(UserRoleMediator.NAME);
    }
  }

  private async onSelect(event: any) {
    try {
      this.component.setData(await this.roleProxy?.findRolesById(event.id));
    } catch(error) {
      console.log(error);
    }
  }

  public get component() { return this.viewComponent }

}
