"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = __importDefault(require("./utilities/env"));
const error_handler_1 = require("./middlewares/error.handler");
const users_route_1 = __importDefault(require("./routes/users.route"));
const token_route_1 = __importDefault(require("./routes/token.route"));
const blogs_route_1 = __importDefault(require("./routes/blogs.route"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const ExpressConfig = () => {
    const app = (0, express_1.default)();
    // * MIDDLEWARE SETUP
    app.use((0, morgan_1.default)("dev"));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        credentials: true,
        origin: env_1.default.FRONTEND_URL,
    }));
    // * MAIN HEALTH CHECK ROUTE
    app.get("/main/healthcheck", (_req, res) => {
        res.status(200).json({ message: "HAPPY CODING - 👋✨🌍" });
    });
    // * API ROUTES FOR TOKEN
    app.use("/api/auth/token", token_route_1.default);
    // * API ROUTES FOR USERS
    app.use("/api/users", users_route_1.default);
    // * API ROUTES FOR BLOGS
    app.use("/api/blogs", auth_1.default, blogs_route_1.default);
    // ! CATCH ALL ERROR HANDLING
    app.use(error_handler_1.NotFound); // Handle 404 errors (Not Found)
    app.use(error_handler_1.ErrorHandler); // Handle all other errors
    return app;
};
exports.default = ExpressConfig;
