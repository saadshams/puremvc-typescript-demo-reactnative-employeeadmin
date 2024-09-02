import { Facade } from "@puremvc/puremvc-typescript-multicore-framework";
import { StartupCommand } from "./controller/StartupCommand";
import { RegisterCommand } from "./controller/RegisterCommand";

export class ApplicationFacade extends Facade {

  public static KEY: string = "employeeAdmin";
  public static STARTUP: string = "startup";
  public static REGISTER: string = "register";

  public constructor(key: string) {
    super(key);
  }

  protected initializeController() {
    super.initializeController();
    this.registerCommand(ApplicationFacade.STARTUP, () => new StartupCommand());
    this.registerCommand(ApplicationFacade.REGISTER, () => new RegisterCommand());
  }

  public static getInstance(key: string, factory: (k: string) => ApplicationFacade): ApplicationFacade {
    return Facade.getInstance(key, factory) as ApplicationFacade;
  }

  public startup() {
    this.sendNotification(ApplicationFacade.STARTUP);
  }
}
