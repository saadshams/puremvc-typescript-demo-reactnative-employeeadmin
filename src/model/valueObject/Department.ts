export interface IDepartment {
  id: number,
  name: string
}

export class Department {
  static NONE_SELECTED = new Department(0, "---None Selected---");
  static ACCT = new Department(1, "Accounting");
  static SALES = new Department(2, "Sales");
  static PLANT = new Department(3, "Plant");
  static SHIPPING = new Department(4, "Shipping");
  static QC = new Department(5, "Quality Control");

  public readonly id: number;
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  private static get list() {
    return [Department.ACCT, Department.SALES, Department.PLANT, Department.SHIPPING, Department.QC];
  }

  public static get comboList() {
    let cList = Department.list;
    cList.unshift(Department.NONE_SELECTED);
    return cList;
  }

  static fromJson({id, name}: IDepartment) {
    return new Department(id, name);
  }

  public get key(): string { return `department_${this.id}`}

}
