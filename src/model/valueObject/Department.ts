export class Department {

  static NONE_SELECTED = new Department(0, "---None Selected---");

  public readonly id: number;
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson({id, name}: Department) {
    return new Department(id, name);
  }

  public get key(): string { return `department_${this.id}`}

}
