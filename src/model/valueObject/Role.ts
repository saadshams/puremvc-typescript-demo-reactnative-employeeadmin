//
//  Role.ts
//  PureMVC TypeScript Demo - React Native EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

export class Role {

  public readonly id: number;
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson({id, name}: Role) {
    return new Role(id, name);
  }

  public get key(): string { return `role_${this.id}` }

}
