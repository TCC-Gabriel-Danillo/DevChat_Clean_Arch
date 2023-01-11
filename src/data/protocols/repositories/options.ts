export enum ORDER {
    ASC = "asc", 
    DESC = "desc"
}
export enum OP {
    EQ = "==", 
    CONTAINS = "array-contains",
    IN = "in"
}
export interface FilterArgs {
    field: string; 
    op: OP; 
    value: any
}

export interface OrderArgs {
    field: string
    order?: ORDER
}

export interface QueryOptions {
    filterArgs?: FilterArgs
    orderArgs?: OrderArgs
}