import { Proxy } from "@puremvc/puremvc-typescript-multicore-framework";
import User from "./valueObject/User";
import Department from "./valueObject/Department";
import { ApplicationConstants } from "../ApplicationConstants";

export default class UserProxy extends Proxy {

  public static NAME = "UserProxy";

  constructor() {
    super(UserProxy.NAME, null);
  }

  public async findAllUsers(): Promise<User[]> {
    const response = await fetch(`${ApplicationConstants.API_URL}/users`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return json.map((user: User) => new User(user.id, "", user.first, user.last));
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  public async findUserById(id: number): Promise<User> {
    const response = await fetch(`${ApplicationConstants.API_URL}/users/${id}`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      return User.fromJson(json);
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  public async findAllDepartments(): Promise<Department[]> {
    const response = await fetch(`${ApplicationConstants.API_URL}/departments`, {method: "GET"});
    if (response.status === 200) {
      const json = await response.json();
      const departments = json.map((department: Department) => Department.fromJson(department));
      departments.unshift(Department.NONE_SELECTED);
      return departments;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }
}
