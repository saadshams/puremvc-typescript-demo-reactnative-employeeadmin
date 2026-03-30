//
//  RoleEnum.ts
//  PureMVC TypeScript Demo - React Native employeeadmin
//
//  Copyright(c) 2026 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

export class RoleEnum {

    static readonly NONE_SELECTED = new RoleEnum("None Selected--", -1);
    static readonly ADMIN= new RoleEnum("Administrator", 0);
    static readonly ACCT_PAY = new RoleEnum( "Accounts Payable", 1);
    static readonly ACCT_RCV = new RoleEnum( "Accounts Receivable"	, 2);
    static readonly EMP_BENEFITS = new RoleEnum( "Employee Benefits", 3);
    static readonly GEN_LEDGER = new RoleEnum( "General Ledger", 4);
    static readonly PAYROLL = new RoleEnum( "Payroll", 5);
    static readonly INVENTORY = new RoleEnum( "Inventory", 6);
    static readonly PRODUCTION = new RoleEnum( "Production", 7);
    static readonly QUALITY_CTL = new RoleEnum( "Quality Control" , 8);
    static readonly SALES = new RoleEnum( "Sales", 9);
    static readonly ORDERS = new RoleEnum( "Orders",10);
    static readonly CUSTOMERS = new RoleEnum( "Customers",11);
    static readonly SHIPPING = new RoleEnum( "Shipping",12);
    static readonly RETURNS = new RoleEnum( "Returns",13);

    readonly ordinal: number;
    readonly value: string;

    private constructor(value: string, ordinal: number) {
        this.value = value;
        this.ordinal = ordinal;
    }

    static get list(): RoleEnum[] {
        return [
            RoleEnum.ADMIN,
            RoleEnum.ACCT_PAY,
            RoleEnum.ACCT_RCV,
            RoleEnum.EMP_BENEFITS,
            RoleEnum.GEN_LEDGER,
            RoleEnum.PAYROLL,
            RoleEnum.INVENTORY,
            RoleEnum.PRODUCTION,
            RoleEnum.QUALITY_CTL,
            RoleEnum.SALES,
            RoleEnum.ORDERS,
            RoleEnum.CUSTOMERS,
            RoleEnum.SHIPPING,
            RoleEnum.RETURNS,
        ];
    }

    static get combo(): RoleEnum[] {
        return [
            RoleEnum.NONE_SELECTED,
            ...RoleEnum.list
        ]
    }

    equals(role: RoleEnum) {
        return this.ordinal === role.ordinal && this.value === role.value;
    }
}
