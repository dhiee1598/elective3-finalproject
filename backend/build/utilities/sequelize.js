"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env_1 = __importDefault(require("./env"));
const pg_1 = __importDefault(require("pg"));
let sequelize;
if (env_1.default.NODE_ENV === "production") {
    sequelize = new sequelize_1.Sequelize(env_1.default.CONNECTION_URI, {
        dialectModule: pg_1.default,
        dialect: "postgres",
    });
}
else {
    sequelize = new sequelize_1.Sequelize({
        dialect: "sqlite",
        storage: "dbsqlite.sqlite3",
    });
}
exports.default = sequelize;
