"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const envalid_1 = require("envalid");
const env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    FRONTEND_URL: (0, envalid_1.url)(),
    NODE_ENV: (0, envalid_1.str)({ choices: ["development", "production"] }),
    CONNECTION_URI: (0, envalid_1.url)(),
    ACCESS_TOKEN_SECRET: (0, envalid_1.str)(),
    REFRESH_TOKEN_SECRET: (0, envalid_1.str)(),
    COOKIE_EXPIRATION_DAYS: (0, envalid_1.num)(),
});
exports.default = env;
