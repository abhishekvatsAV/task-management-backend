import { Response } from "express";
import { UserRequest } from "../types";
import TaskModel from "../models/task";

export const getAllTasks = async (req: UserRequest, res: Response) => {
  try {
    const tasks = await TaskModel.find({ userId: req.user._id });
    res.status(200).json({ tasks: tasks });
  } catch (err) {
    console.log("error while getting all the tasks : ", err);
    res.status(400).json({ message: err.message });
    return;
  }
};

export const addTask = async (req: UserRequest, res: Response) => {
  const { title, description } = req.body;
  try {
    await TaskModel.create({ title, description, userId: req.user._id });
    res.status(200).json({ message: "task created" });
  } catch (err) {
    console.log("error while creating the task : ", err);
    res.status(400).json({ message: err.message });
    return;
  }
};

export const deleteTask = async (req: UserRequest, res: Response) => {
  const id = req.params.id;
  try {
    await TaskModel.deleteOne({ userId: req.user._id, _id: id });
    res.status(200).json({ message: "task got deleted successfully." });
    return;
  } catch (err) {
    console.log("error while deleting the task: ", err);
    res.status(400).json({ message: err.message });
    return;
  }
};
