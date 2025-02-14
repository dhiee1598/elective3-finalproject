"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_controller_1 = require("../controllers/token.controller");
const router = (0, express_1.Router)();
// * Description:    Refresh access token
// * Route:          POST /api/auth/token/renew
// * Access:         Private
router.post("/renew", token_controller_1.RefreshAccessToken);
exports.default = router;
