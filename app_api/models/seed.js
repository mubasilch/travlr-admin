require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Trip = require("./trips");

const dbURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/travlr";

function pad3(n) {
  return String(n).padStart(3, "0");
}

function makeStartDate(index) {
  const d = new Date();
  d.setDate(d.getDate() + 14 + index * 7);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function pickImage(location, pricePoint) {
  const loc = (location || "").toLowerCase();
  if (loc.includes("maldives")) return "/images/reef1.jpg";
  if (loc.includes("bali")) return "/images/reef2.jpg";
  if (loc.includes("hawai")) return "/images/reef3.jpg";
  if ((pricePoint || "").toLowerCase().includes("lux")) return "/images/deluxe.jpg";
  return "/images/suite.jpg";
}

function normalizeTrip(t, index) {
  const code = `TRIP${pad3(index + 1)}`;
  const nights = Number(t.nights ?? 0);
  const includes = Array.isArray(t.includes) ? t.includes : [];

  return {
    code,
    name: t.name,
    length: nights ? `${nights} nights` : "Flexible",
    start: makeStartDate(index),
    resort: t.location,
    perPerson: Number(t.price ?? 0),
    image: pickImage(t.location, t.pricePoint),
    description:
      `${t.pricePoint || "Standard"} trip to ${t.location}. ` +
      (includes.length ? `Includes: ${includes.join(", ")}.` : ""),
  };
}

async function seedTrips() {
  try {
    await mongoose.connect(dbURI, { serverSelectionTimeoutMS: 8000 });

    const filePath = path.join(__dirname, "../../data/trips.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const tripArray = JSON.parse(raw);

    if (!Array.isArray(tripArray) || tripArray.length === 0) {
      throw new Error("trips.json must be an array of trips.");
    }

    const normalized = tripArray.map((t, idx) => normalizeTrip(t, idx));

    await Trip.deleteMany({});
    await Trip.insertMany(normalized);

    console.log(`Seed complete: inserted ${normalized.length} trips`);
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedTrips();