"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
class DataManager {
    constructor() {
        this.database = new better_sqlite3_1.default("database.db");
        this.initialize();
    }
    /*** Public Methods ***/
    run(query, params) {
        const statement = this.database.prepare(query);
        return statement.run(params);
    }
    get(query, params, isAll = false) {
        const statement = this.database.prepare(query);
        return isAll ? statement.all(params) : statement.get(params);
    }
    /*** Private Methods ***/
    initialize() {
        this.database.exec(`
            CREATE TABLE IF NOT EXISTS dogs (
                id   INTEGER PRIMARY KEY,
                name TEXT,
                age  INTEGER,
                breed TEXT,
                gender INTEGER
            );
        `);
    }
}
exports.default = DataManager;
