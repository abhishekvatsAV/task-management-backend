"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.addTask = exports.getAllTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const getAllTasks = async (req, res) => {
    try {
        const tasks = await task_1.default.find({ userId: req.user._id });
        res.status(200).json({ tasks: tasks });
    }
    catch (err) {
        console.log("error while getting all the tasks : ", err);
        res.status(400).json({ message: err.message });
        return;
    }
};
exports.getAllTasks = getAllTasks;
const addTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        await task_1.default.create({ title, description, userId: req.user._id });
        res.status(200).json({ message: "task created" });
    }
    catch (err) {
        console.log("error while creating the task : ", err);
        res.status(400).json({ message: err.message });
        return;
    }
};
exports.addTask = addTask;
const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        await task_1.default.deleteOne({ userId: req.user._id, _id: id });
        res.status(200).json({ message: "task got deleted successfully." });
        return;
    }
    catch (err) {
        console.log("error while deleting the task: ", err);
        res.status(400).json({ message: err.message });
        return;
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.js.map