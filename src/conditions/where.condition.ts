import { IWhere } from "../types/where.type";

export const generateWhereCondition = (where:IWhere):string => {
    const conditionsKeys = Object.keys(where);
    const conditionsNumber = conditionsKeys.length;

    let WHERE = " WHERE";

    conditionsKeys.forEach((key, i) => {
        if(i < 1){
            WHERE += ` ${key} = "${where[key]}"`
        } else {
            WHERE += ` AND ${key} = "${where[key]}"`
        }
    })

    return WHERE
}