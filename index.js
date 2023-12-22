"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const task_js_1 = __importDefault(require("./routes/task.js"));
const auth_js_1 = require("./middlewares/auth.js");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // this will parse any request and get any json inside any req.body
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const mongoUrl = process.env.MONGO_URL;
mongoose_1.default
    .connect(mongoUrl)
    .then((res) => {
    if (res) {
        app.listen(4000, () => {
            console.log("connected to db and listening to port : ", 4000);
        });
    }
})
    .catch((err) => {
    console.log("🛑 error in connecting with db : ", err);
});
app.get("/", (req, res, next) => {
    res.status(200).json({ message: "how u doin?" });
    return;
});
app.use("/user", user_js_1.default);
app.use(auth_js_1.checkAuth);
app.use("/task", task_js_1.default);
//# sourceMappingURL=index.js.map