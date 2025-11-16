const Task = require("../models/Task-Schema");
const { getWeekRange } = require("../utils/week-range");

exports.getUserTasks = async (req, res) => {
  try {
    const { q, user } = req.query;

    let filter = { user };

    if (!q || q.trim() === "") {
      const { monday, sunday } = getWeekRange();
      filter.date = { $gte: monday, $lte: sunday };
    }

    if (q && q.trim() !== "") {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter).sort({ date: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, priority, user } =
      req.body;

    if (!title || !date || !startTime || !endTime || !user)
      return res.status(400).json({ error: "Missing required fields" });

    const task = await Task.create({
      title,
      description,
      date: new Date(date),
      startTime,
      endTime,
      priority,
      user,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const body = req.body;
    if (body.date) {
      body.date = new Date(body.date);
    }

    const task = await Task.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
