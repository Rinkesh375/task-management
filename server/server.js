require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/db");

const taskRoutes = require("./src/routes/tasks-route");
const userRoutes = require("./src/routes/user-route");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
