import { TTable } from './types/basemodel.type';
declare class BaseModel {
    static db?: dbConnection;
    protected tableName: string;
    protected tableModel?: TTable;
    protected constructor(tName: string, tModel?: TTable);
    static setConnection(host: string, user: string, password: string, database: string): void;
    static generateUid: (length?: number) => Promise<any>;
    static newMysqlDate: (gg: number, mm: number, year: number) => string;
    protected getModel(): TTable;
    protected readOne(where: string, value: any): Promise<any>;
    protected readAll(): Promise<any>;
    protected readAllWhere(whereConditions: {
        [key: string]: any;
    }, tableName?: string): Promise<unknown>;
    protected insertOne(data: {
        [key: string]: any;
    }): Promise<unknown>;
    protected updateOne(where: {
        [key: string]: any;
    }, data: {
        [key: string]: any;
    }): Promise<unknown>;
    protected _directQuery(query: string, values: Array<any>): Promise<unknown>;
}
declare class dbConnection {
    private pool;
    constructor(host: string, user: string, password: string, database: string);
    newQuery(query: string, queryValues?: string | string[]): Promise<unknown>;
}
export declare const createBaseModel: (host: string, user: string, password: string, database: string) => typeof BaseModel;
export {};
