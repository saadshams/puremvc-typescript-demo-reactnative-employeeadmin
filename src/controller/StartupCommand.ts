import { NativeEventEmitter, NativeModules } from "react-native";

import {SimpleCommand, INotification} from "@puremvc/puremvc-typescript-multicore-framework";
import { USER_FORM_MOUNTED, USER_LIST_MOUNTED, USER_ROLE_MOUNTED } from "../ApplicationConstants";
import { UserProxy } from "../model/UserProxy";
import { RoleProxy } from "../model/RoleProxy";
import { ApplicationFacade } from "../ApplicationFacade";

export class StartupCommand extends SimpleCommand {

  execute(notification: INotification) {
    this.facade.registerProxy(new UserProxy());
    this.facade.registerProxy(new RoleProxy());

    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    [USER_LIST_MOUNTED, USER_FORM_MOUNTED, USER_ROLE_MOUNTED].forEach(value =>
      emitter.addListener(value, event =>
        this.facade.sendNotification(ApplicationFacade.REGISTER, event, value)));
  }

}
