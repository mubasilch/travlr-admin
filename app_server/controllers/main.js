const { getTrips } = require("../models/trips");

const home = (req, res) => {
  res.render("index", {
    title: "Travlr Getaways",
    page: "home",
  });
};

const travel = (req, res) => {
  const data = getTrips();

  // trips.json is an array in our fix, but this also supports { packages: [...] } just in case
  const packages = Array.isArray(data) ? data : (data.packages || []);

  res.render("travel", {
    title: "Travel",
    page: "travel",
    packages
  });
};

const rooms = (req, res) => {
  res.render("rooms", {
    title: "Rooms",
    page: "rooms",
  });
};

const meals = (req, res) => {
  res.render("meals", {
    title: "Meals",
    page: "meals",
  });
};

const news = (req, res) => {
  res.render("news", {
    title: "News",
    page: "news",
  });
};

const about = (req, res) => {
  res.render("about", {
    title: "About",
    page: "about",
  });
};

const contact = (req, res) => {
  res.render("contact", {
    title: "Contact",
    page: "contact",
  });
};

module.exports = { home, travel, rooms, meals, news, about, contact };
