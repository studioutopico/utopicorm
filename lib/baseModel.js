"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseModel = void 0;
var mysql2_1 = require("mysql2");
var nanoid_1 = require("nanoid");
var BaseModel = /** @class */ (function () {
    function BaseModel(tName, tModel) {
        this.tableName = tName;
        if (tModel != undefined) {
            this.tableModel = tModel;
        }
        //const tableExists = checkIfTableExists(tName);
    }
    //imposta modulo connessione (mysql2)
    BaseModel.setConnection = function (host, user, password, database) {
        this.db = new dbConnection(host, user, password, database);
    };
    BaseModel.prototype.getModel = function () {
        return this.tableModel;
    };
    BaseModel.prototype.readOne = function (where, value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var query, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = "SELECT * FROM " + this.tableName + " WHERE " + where + " = ?";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ((_a = BaseModel.db) === null || _a === void 0 ? void 0 : _a.newQuery(query, value))];
                    case 2:
                        result = _b.sent();
                        if (Array.isArray(result) && result.length) {
                            return [2 /*return*/, result[0]];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, error_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.readAll = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var query, result, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = "SELECT * FROM " + this.tableName;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ((_a = BaseModel.db) === null || _a === void 0 ? void 0 : _a.newQuery(query, []))];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _b.sent();
                        throw new Error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.readAllWhere = function (whereConditions, tableName) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var query, whereKeys, whereValues, i, queryResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = "SELECT * FROM " + (tableName ? tableName : this.tableName) + " ";
                        whereKeys = Object.keys(whereConditions);
                        whereValues = [];
                        query += "WHERE " + whereKeys[0] + " = ? ";
                        whereValues.push(whereConditions[whereKeys[0]]);
                        if (whereKeys.length > 1) {
                            for (i = 1; i < whereKeys.length; i++) {
                                whereValues.push(whereConditions[whereKeys[i]]);
                                query += " AND " + whereKeys[i] + " = ?";
                            }
                        }
                        console.log(query);
                        return [4 /*yield*/, ((_a = BaseModel.db) === null || _a === void 0 ? void 0 : _a.newQuery(query, whereValues))];
                    case 1:
                        queryResult = _b.sent();
                        return [2 /*return*/, queryResult];
                }
            });
        });
    };
    BaseModel.prototype.insertOne = function (data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var keys, values, query, queryResult, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keys = Object.keys(data);
                        if (!keys.length) return [3 /*break*/, 5];
                        values = keys.map(function (key) { return data[key]; });
                        query = "\n            INSERT INTO " + this.tableName + " \n            (" + keys.join(",") + ") \n            VALUES (" + values.map(function (val) { return "?"; }).join(",") + ")";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        console.log(query);
                        return [4 /*yield*/, ((_a = BaseModel.db) === null || _a === void 0 ? void 0 : _a.newQuery(query, values))];
                    case 2:
                        queryResult = _b.sent();
                        return [2 /*return*/, queryResult];
                    case 3:
                        error_3 = _b.sent();
                        throw new Error(error_3);
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        console.log("missing arguments for data object", data);
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype.updateOne = function (where, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var dataKeys, whereKeys, values, query, queryResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKeys = Object.keys(data);
                        whereKeys = Object.keys(where);
                        if (!(dataKeys.length && whereKeys.length)) return [3 /*break*/, 2];
                        values = __spreadArray(__spreadArray([], (dataKeys.map(function (key) { return data[key]; }))), (whereKeys.map(function (key) { return where[key]; })));
                        query = "\n            UPDATE " + this.tableName + " \n            SET " + dataKeys.map(function (val) { return val + " = ?"; }).join(",") + "\n            WHERE " + whereKeys.map(function (val) { return val + " = ?"; }).join(" AND ");
                        console.log(query, values);
                        return [4 /*yield*/, ((_a = BaseModel.db) === null || _a === void 0 ? void 0 : _a.newQuery(query, values))];
                    case 1:
                        queryResult = _b.sent();
                        return [2 /*return*/, queryResult];
                    case 2:
                        console.log("missing arguments for data object", data);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.prototype._directQuery = function (query, values) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var queryResult, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ((_a = BaseModel.db) === null || _a === void 0 ? void 0 : _a.newQuery(query, values))];
                    case 1:
                        queryResult = _b.sent();
                        return [2 /*return*/, queryResult];
                    case 2:
                        error_4 = _b.sent();
                        throw new Error(error_4);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseModel.generateUid = function (length) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, nanoid_1.nanoid(length || 10)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    BaseModel.newMysqlDate = function (gg, mm, year) {
        if (gg && mm && year) {
            return year + "-" + mm + "-" + gg;
        }
        else
            throw new Error("DATA FORMAT INVALID");
    };
    return BaseModel;
}());
var dbConnection = /** @class */ (function () {
    function dbConnection(host, user, password, database) {
        this.pool = mysql2_1.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
        });
    }
    dbConnection.prototype.newQuery = function (query, queryValues) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (queryValues) {
                _this.pool.query(query, queryValues, function (err, result, fields) {
                    if (err)
                        reject(err);
                    else {
                        resolve(result);
                    }
                });
            }
            else {
                console.log("values not provided");
                return [];
            }
        });
    };
    return dbConnection;
}());
var createBaseModel = function (host, user, password, database) {
    BaseModel.setConnection(host, user, password, database);
    return BaseModel;
};
exports.createBaseModel = createBaseModel;
