"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./utilities/env"));
const sequelize_1 = __importDefault(require("./utilities/sequelize"));
const app = (0, app_1.default)();
const StartServer = async () => {
    try {
        // * Sync the Sequelize connection with the database to ensure models are updated
        await sequelize_1.default.sync();
        console.log("Connection has been established successfully");
        // * Start the server and listen on the specified port
        app.listen(env_1.default.PORT, () => {
            console.log(`Listening: http://localhost:${env_1.default.PORT}`);
        });
    }
    catch (error) {
        // ! Log an error message if unable to connect to the database
        console.log(`Unable to connect to the database. ${error}`);
    }
};
StartServer();
