import {Department} from "./Department";
import {Role} from "./Role";

export interface IUser {
  id: number; username: string; first: string; last: string; email: string;
  password: string; department: Department; roles: Role[];
}

export class User {
  public readonly id: number;
  public username: string;
  public first: string;
  public last: string;
  public email: string;
  public password: string;
  public confirm: string | undefined;
  public department: Department;
  public roles: Set<Role>;

  constructor(id = 0, username = "", first = "", last = "", email = "", password = "", department = Department.NONE_SELECTED, roles: Set<Role> = new Set()) {
    this.id = id;
    this.username = username;
    this.first = first;
    this.last = last;
    this.email = email;
    this.password = password;
    this.department = department;
    this.roles = roles;
  }

  static fromJson({id, username, first, last, email, password, department, roles}: IUser) {
    return new User(id, username, first, last, email, password, Department.fromJson(department), new Set(roles.map(r => r)));
  }

  // public get key(): string { return `user_${this.id}` };
}

