import {Pool, createPool} from 'mysql2'
import {nanoid} from 'nanoid'
import { TTable,TBaseConnectionArguments } from './types/basemodel.type'
import { resolve } from 'path';


class BaseModel{
    static db?:dbConnection;
    protected tableName: string;
    protected tableModel?: TTable;


    protected constructor(tName: string, tModel?:TTable,){
        this.tableName = tName;
        if(tModel != undefined){
            this.tableModel = tModel;
        }
        
        //const tableExists = checkIfTableExists(tName);

    }

    //imposta modulo connessione (mysql2)

    static setConnection(host:string , user:string, password:string, database:string){
        this.db = new dbConnection(host, user, password, database)
    }

    static generateUid = async (length?:number) => await nanoid(length||10);

    static newMysqlDate = (gg:number, mm:number, year:number) => {
        if(gg && mm && year){
            return `${year}-${mm}-${gg}`
        } else throw new Error("DATA FORMAT INVALID");
        
    }


    protected getModel(){
        return this.tableModel;
    }

    protected async readOne(where:string, value:any){
        const query = `SELECT * FROM ${this.tableName} WHERE ${where} = ?`;
        try {
            const result = await BaseModel.db?.newQuery(query, value) as any;
            if(Array.isArray(result) && result.length){
                return result[0]
            } else {
                return null
            }
        } catch (error) {
            return error
        }
    }

    protected async readAll(){
        const query = `SELECT * FROM ${this.tableName}`
        try {
            const result = await BaseModel.db?.newQuery(query, []) as any
            return result
        } catch (error) {
            throw new Error(error);
        }
    }

    protected async readAllWhere(whereConditions:{[key:string]: any}, tableName?:string){
        let query = `SELECT * FROM ${tableName ? tableName : this.tableName} `
        const whereKeys = Object.keys(whereConditions);
        const whereValues = []
        query += `WHERE ${whereKeys[0]} = ? `
        whereValues.push(whereConditions[whereKeys[0]]);
        if(whereKeys.length > 1){
            for(let i = 1; i < whereKeys.length; i++){
                whereValues.push(whereConditions[whereKeys[i]])
                query += ` AND ${whereKeys[i]} = ?`
            }
        }
        console.log(query)
        const queryResult = await BaseModel.db?.newQuery(query, whereValues)
        return queryResult
    }

    protected async insertOne(data:{[key:string]:any}){
        const keys = Object.keys(data)
        if(keys.length){
            const values = keys.map(key => data[key]);
            const query = `
            INSERT INTO ${this.tableName} 
            (${keys.join(",")}) 
            VALUES (${values.map(val => "?").join(",")})`;
            try {
                console.log(query)
                const queryResult = await BaseModel.db?.newQuery(query, values)
                return queryResult  
            } catch (error) {
                throw new Error(error);
            }
        } else {
            console.log("missing arguments for data object", data)
        }
    }

    protected async updateOne(where:{[key:string]:any}, data:{[key:string]:any}){
        const dataKeys = Object.keys(data);
        const whereKeys = Object.keys(where);

        if(dataKeys.length && whereKeys.length){
            const values = [
                ...(dataKeys.map(key => data[key])),
                ...(whereKeys.map(key => where[key]))
            ]
            const query = `
            UPDATE ${this.tableName} 
            SET ${dataKeys.map(val => `${val} = ?`).join(",")}
            WHERE ${whereKeys.map(val => `${val} = ?`).join(" AND ")}`;
            console.log(query, values)
            const queryResult = await BaseModel.db?.newQuery(query, values)
            return queryResult
        } else {
            console.log("missing arguments for data object", data)
        }
    }

    protected async _directQuery(query:string, values:Array<any>){
        try {
            const queryResult = await BaseModel.db?.newQuery(query, values) ;
            return queryResult

        } catch (error) {
            throw new Error(error);
            
        }
    }

    

}

class dbConnection{
    private pool: Pool;
  

    constructor(host:string , user:string, password:string, database:string){
        this.pool = createPool({
            host,
            user,
            password,
            database,
        })
    }

    newQuery(query:string, queryValues?: string|string[]){
        return new Promise((resolve, reject) => {
            if(queryValues){
                this.pool.query(query, queryValues, (err, result, fields) => {
                    if(err) reject(err)
                    else {
                        resolve(result)
                    }
                })
            } else {
                console.log("values not provided")
                return []
            }
            
        })
    }
}


export const createBaseModel = (host:string, user:string, password:string, database:string): typeof BaseModel => {
    BaseModel.setConnection(host, user, password, database);
    return BaseModel
}