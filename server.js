const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables

dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parse
app.use(express.json());

// Enable cors
app.use(cors());

// Set up static older
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/hosts", require("./routes/hosts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
