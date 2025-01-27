require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
console.log(process.env.MONGO_URL);
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/api/v1/test", require("./routes/testRouter"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant",require("./routes/restaurantRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1> Welcome to the server </h1>");
});

const PORT = process.env.PORT || 3000;



mongoose.connect("mongodb://127.0.0.1:27017/foodDB", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Connection error:", err);
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
