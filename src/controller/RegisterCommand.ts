import { INotification, SimpleCommand } from "@puremvc/puremvc-typescript-multicore-framework";
import { UserListMediator } from "../view/UserListMediator";
import { UserFormMediator } from "../view/UserFormMediator";
import { UserRoleMediator } from "../view/UserRoleMediator";
import { ApplicationConstants } from "../ApplicationConstants";

export class RegisterCommand extends SimpleCommand {

  execute(notification: INotification) {
    const component = notification.body;
    switch (component.NAME) {
      case ApplicationConstants.USER_LIST:
        this.facade.registerMediator(new UserListMediator(component));
        break;
      case ApplicationConstants.USER_FORM:
        this.facade.registerMediator(new UserFormMediator(component));
        break;
      case ApplicationConstants.USER_ROLE:
        this.facade.registerMediator(new UserRoleMediator(component));
        break;
      default:
        console.log(component.NAME);
        break;
    }
  }

}
