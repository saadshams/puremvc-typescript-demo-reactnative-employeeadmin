import { Facade } from "@puremvc/puremvc-typescript-multicore-framework";
import { StartupCommand } from "./controller/StartupCommand";
import { RegisterCommand } from "./controller/RegisterCommand";
import { ApplicationConstants } from "./ApplicationConstants";
import { NativeEventEmitter, NativeModules } from "react-native";

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

  public static getInstance(key: string): ApplicationFacade {
    return Facade.getInstance(key, k => new ApplicationFacade(k)) as ApplicationFacade;
  }

  public startup() {
    console.log("startup");
    const emitter = new NativeEventEmitter(NativeModules.EmployeeAdmin);
    emitter.addListener(ApplicationConstants.MOUNTED, (event) => this.register(event) );
    this.sendNotification(ApplicationFacade.STARTUP);
  }

  public register(component: any) {
    this.sendNotification(ApplicationFacade.REGISTER, component);
  }
}
