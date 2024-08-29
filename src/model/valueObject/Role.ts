export interface IRole {
  id: number,
  name: string
}

export class Role {

  static NONE_SELECTED = new Role(0, "--None Selected---");

  public readonly id: number;
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson({id, name}: IRole) {
    return new Role(id, name);
  }

  public get key(): string { return `role_${this.id}` }

}
