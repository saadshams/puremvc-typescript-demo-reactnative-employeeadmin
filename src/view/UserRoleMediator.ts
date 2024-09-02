import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
import { Mediator } from "@puremvc/puremvc-typescript-multicore-framework";
import { RoleProxy } from "../model/RoleProxy";
import { IUserRole } from "./components/UserRole";

export class UserRoleMediator extends Mediator {

  public static NAME = "UserRoleMediator";

  private emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
  private listeners: EmitterSubscription[] = [];
  private roleProxy!: RoleProxy;

  constructor(component: any) {
    super(UserRoleMediator.NAME, component);
  }

  public async onRegister() {
    this.listeners.push(this.emitter.addListener(this.component.USER_ROLE_FETCH, event => this.onSelect(event)));

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

  private async onSelect(event: any) {
    try {
      this.component.setData(await this.roleProxy?.findRolesById(event.id));
    } catch(error) {
      console.log(error);
    }
  }

  public get component() : IUserRole {
    return this.viewComponent
  }

}
