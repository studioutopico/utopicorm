"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWhereCondition = void 0;
var generateWhereCondition = function (where) {
    var conditionsKeys = Object.keys(where);
    var conditionsNumber = conditionsKeys.length;
    var WHERE = " WHERE";
    conditionsKeys.forEach(function (key, i) {
        if (i < 1) {
            WHERE += " " + key + " = \"" + where[key] + "\"";
        }
        else {
            WHERE += " AND " + key + " = \"" + where[key] + "\"";
        }
    });
    return WHERE;
};
exports.generateWhereCondition = generateWhereCondition;
