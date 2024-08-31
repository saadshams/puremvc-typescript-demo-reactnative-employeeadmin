export default class Role {

  static NONE_SELECTED = new Role(0, "--None Selected---");

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
