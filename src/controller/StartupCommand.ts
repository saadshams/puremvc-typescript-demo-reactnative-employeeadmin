import {SimpleCommand, INotification} from "@puremvc/puremvc-typescript-multicore-framework";
import UserProxy from "../model/UserProxy";
import RoleProxy from "../model/RoleProxy";

export class StartupCommand extends SimpleCommand {

  execute(notification: INotification) {
    this.facade.registerProxy(new UserProxy());
    this.facade.registerProxy(new RoleProxy());
  }

}
