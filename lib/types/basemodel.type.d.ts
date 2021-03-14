export interface IBaseModel {
    name: string;
}
export declare type TTable = {
    [key: string]: "string" | "boolean" | "number" | "date";
};
export declare type TBaseConnectionArguments = (host: string, user: string, password: string, database: string) => any;
