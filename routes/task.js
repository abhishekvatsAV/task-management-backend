"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = require("../controllers/task");
const router = express_1.default.Router();
router.get("/", task_1.getAllTasks);
router.post("/", task_1.addTask);
router.delete("/:id", task_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task.js.map