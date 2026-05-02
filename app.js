require("dotenv").config();
const express = require("express");

const loggingMiddleware = require("./middleware/loggingMiddleware");
const schedulerRoutes = require("./routes/schedulerRoutes");

const app = express();

app.use(express.json());
app.use(loggingMiddleware);

app.use("/api", schedulerRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});