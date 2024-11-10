require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
connectDB();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/recipe", require("./routes/recipe"));
app.use("/api/review", require("./routes/review"));

app.listen(port, () => {
  console.log(`App is currently running on port https://localhost:${port}`);
});
