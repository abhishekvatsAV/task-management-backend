"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserLogin = exports.handleUserSignUp = void 0;
const user_js_1 = __importDefault(require("../models/user.js"));
const auth_js_1 = require("../service/auth.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleUserSignUp = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await user_js_1.default.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email Already Exists" });
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hash = await bcrypt_1.default.hash(password, salt);
    const newUser = await user_js_1.default.create({ username, email, password: hash });
    const token = (0, auth_js_1.setUser)(newUser);
    return res.status(200).json({
        token: token,
    });
};
exports.handleUserSignUp = handleUserSignUp;
const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_js_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "User Doesn't Exists or Email or Password are not Correct.",
        });
    }
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match) {
        return res.status(400).json({
            message: "User Doesn't Exists or Email or Password are not Correct.",
        });
    }
    const token = (0, auth_js_1.setUser)(user);
    req.token = token;
    return res.status(200).json({ token: token });
};
exports.handleUserLogin = handleUserLogin;
//# sourceMappingURL=user.js.map