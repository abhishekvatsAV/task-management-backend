"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = require("../controllers/user.js");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/signup", user_js_1.handleUserSignUp);
router.post("/login", user_js_1.handleUserLogin);
exports.default = router;
//# sourceMappingURL=user.js.map