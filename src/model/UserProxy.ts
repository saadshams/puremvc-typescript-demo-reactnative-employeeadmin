import { Proxy } from "@puremvc/puremvc-typescript-multicore-framework";
import { User, IUser } from "./valueObject/User";
import { Department, IDepartment } from "./valueObject/Department";
import { Platform } from "react-native";

export class UserProxy extends Proxy {

  public static NAME = "UserProxy";

  constructor() {
    super(UserProxy.NAME, null);
  }

  public async findAllUsers(): Promise<User[]> {
    const response = await fetch(Platform.OS === "android" ? "http://10.0.2.2/users" : "http://127.0.0.1/users", {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return json.map((user: IUser) => User.fromJson(user));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  public async findUserById(id: number): Promise<User> {
    const response = await fetch(Platform.OS === "android" ? `http://10.0.2.2/users/${id}` : `http://127.0.0.1/users/${id}`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return json.map((user: IUser) => User.fromJson(user));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  public async findAllDepartments(): Promise<Department[]> {
    const response = await fetch(Platform.OS === "android" ? "http://10.0.2.2/departments" : "http://127.0.0.1/departments", {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return json.map((department: IDepartment) => Department.fromJson(department));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }
}
