"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blogs = exports.Users = void 0;
const users_model_1 = __importDefault(require("./users.model"));
exports.Users = users_model_1.default;
const blogs_model_1 = __importDefault(require("./blogs.model"));
exports.Blogs = blogs_model_1.default;
// 1:M
users_model_1.default.hasMany(blogs_model_1.default, { foreignKey: "userId" });
blogs_model_1.default.belongsTo(users_model_1.default, { foreignKey: "userId" });
