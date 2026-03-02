require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("./app_api/models/db"); // Database connection

const indexRouter = require("./app_server/routes/index");
const apiRouter = require("./app_api/routes/index");
const authRoutes = require("./app_api/routes/auth"); // auth endpoints

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/api/auth", authRoutes); // ✅ /api/auth/login + /api/auth/register

module.exports = app;