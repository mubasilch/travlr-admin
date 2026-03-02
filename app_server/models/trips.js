const fs = require("fs");
const path = require("path");

const tripsFile = path.join(__dirname, "..", "data", "trips.json");

const getTrips = () => {
  const data = fs.readFileSync(tripsFile, "utf-8");
  return JSON.parse(data);
};

module.exports = { getTrips };
