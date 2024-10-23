//
//  StartupCommand.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { NativeEventEmitter, NativeModules } from "react-native";

import { SimpleCommand, INotification } from "@puremvc/puremvc-typescript-multicore-framework";
import { ApplicationConstants } from "../ApplicationConstants";
import { ApplicationFacade } from "../ApplicationFacade";
import { UserProxy } from "../model/UserProxy";
import { RoleProxy } from "../model/RoleProxy";

export class StartupCommand extends SimpleCommand {

  execute(notification: INotification) {
    this.facade.registerProxy(new UserProxy());
    this.facade.registerProxy(new RoleProxy());

    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    [
      ApplicationConstants.USER_LIST_MOUNTED, ApplicationConstants.USER_LIST_UNMOUNTED,
      ApplicationConstants.USER_FORM_MOUNTED, ApplicationConstants.USER_FORM_UNMOUNTED,
      ApplicationConstants.USER_ROLE_MOUNTED, ApplicationConstants.USER_ROLE_UNMOUNTED
    ].forEach(type =>
      emitter.addListener(type, event =>
        this.facade.sendNotification(ApplicationFacade.REGISTER, event, type)
      )
    );

  }

}
