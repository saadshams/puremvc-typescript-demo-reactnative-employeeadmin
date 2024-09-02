import { Department } from "./Department";
import { Role } from "./Role";

export class User {
  public readonly id: number;
  public username: string;
  public first: string;
  public last: string;
  public email: string;
  public password: string;
  public confirm: string = "";
  public department: Department;
  public roles: Role[];

  constructor(id = 0, username = "", first = "", last = "", email = "", password = "", department = Department.NONE_SELECTED, roles: Role[] = []) {
    this.id = id;
    this.username = username;
    this.first = first;
    this.last = last;
    this.email = email;
    this.password = password;
    this.confirm = password;
    this.department = department;
    this.roles = roles;
  }

  static validate(confirm: string): boolean {
    return false;
  }

  static fromJson({id, username, first, last, email, password, department, roles}: User) {
    return new User(id, username, first, last, email, password, Department.fromJson(department), roles.map(r => r)); // ...[roles].map(r => r)
  }

  // public get key(): string { return `user_${this.id}` };
}
