import { INotification, SimpleCommand } from "@puremvc/puremvc-typescript-multicore-framework";
import { UserListMediator } from "../view/UserListMediator";
import { UserFormMediator } from "../view/UserFormMediator";
import { UserRoleMediator } from "../view/UserRoleMediator";
import { USER_LIST_MOUNTED, USER_FORM_MOUNTED, USER_ROLE_MOUNTED } from "../ApplicationConstants";

export class RegisterCommand extends SimpleCommand {

  execute(notification: INotification) {
    switch (notification.type) {
      case USER_LIST_MOUNTED:
        this.facade.registerMediator(new UserListMediator(notification.body));
        break;
      case USER_FORM_MOUNTED:
        this.facade.registerMediator(new UserFormMediator(notification.body));
        break;
      case USER_ROLE_MOUNTED:
        this.facade.registerMediator(new UserRoleMediator(notification.body));
        break;
      default:
        console.log(notification.type);
        break;
    }
  }

}
