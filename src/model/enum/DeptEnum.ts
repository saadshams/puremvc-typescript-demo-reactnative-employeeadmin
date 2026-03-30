//
//  DeptEnum.ts
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

export class DeptEnum {
    static readonly NONE_SELECTED = new DeptEnum("--None Selected--", -1);
    static readonly ACCT = new DeptEnum("Accounting", 0);
    static readonly SALES = new DeptEnum("Sales", 1);
    static readonly PLANT = new DeptEnum("Plant", 2);
    static readonly SHIPPING = new DeptEnum("Shipping", 3);
    static readonly QC = new DeptEnum("Quality Control", 4);

    readonly ordinal: number;
    readonly value: string;

    private constructor(value: string, ordinal: number) {
        this.value = value;
        this.ordinal = ordinal;
    }

    static get list(): DeptEnum[] {
        return [
            DeptEnum.ACCT,
            DeptEnum.SALES,
            DeptEnum.PLANT,
            DeptEnum.SHIPPING,
            DeptEnum.QC
        ];
    }

    static get combo(): DeptEnum[] {
        return [
            DeptEnum.NONE_SELECTED,
            ...DeptEnum.list
        ]
    }

    equals(dept: DeptEnum) {
        return this.ordinal === dept.ordinal && this.value === dept.value;
    }
}
