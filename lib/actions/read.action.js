"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOne = void 0;
var where_condition_1 = require("../conditions/where.condition");
var readOne = function (where) {
    var whereCondition = where_condition_1.generateWhereCondition(where);
    var readQuery = "READ " + whereCondition;
    return readQuery;
};
exports.readOne = readOne;
