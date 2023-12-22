"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.setUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "secretKey@1223";
const setUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    };
    // this will return token
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "3d" });
    // TODO update this expiresIn time to 10s or 3d
};
exports.setUser = setUser;
const getUser = (token) => {
    if (!token)
        return null;
    try {
        // this will return payload attached to this token
        // i.e. user
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch {
        return null;
    }
};
exports.getUser = getUser;
//# sourceMappingURL=auth.js.map