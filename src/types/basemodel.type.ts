export interface IBaseModel{
    name: string
}

export type TTable = {
    [key:string]: "string" | "boolean" | "number" | "date"
}

export type TBaseConnectionArguments = (host:string , user:string, password:string, database:string) => any;