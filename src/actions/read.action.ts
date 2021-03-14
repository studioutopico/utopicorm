import { generateWhereCondition } from "../conditions/where.condition"
import { IWhere } from "../types/where.type"


export const readOne = (where:IWhere) => {
    const whereCondition = generateWhereCondition(where);
    const readQuery = `READ ${whereCondition}`;
    return readQuery;
}