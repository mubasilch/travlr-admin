const mongoose = require("mongoose");

// Use Atlas connection string if provided, otherwise fallback to local MongoDB
const dbURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/travlr";

// Connect
mongoose.connect(dbURI);

// Connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to: " + dbURI);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Graceful shutdown (FIXED FOR MONGOOSE 7+)
const gracefulShutdown = async (msg) => {
  await mongoose.connection.close();
  console.log("Mongoose disconnected through " + msg);
  process.exit(0);
};

process.once("SIGUSR2", async () => {
  await gracefulShutdown("nodemon restart");
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", async () => {
  await gracefulShutdown("app termination");
});

process.on("SIGTERM", async () => {
  await gracefulShutdown("Heroku shutdown");
});

// Load models
require("./trips");
require("./user");