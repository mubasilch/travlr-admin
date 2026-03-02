const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");

const sendJSONresponse = (res, status, content) => {
  res.status(status).json(content);
};

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    sendJSONresponse(res, 200, trips);
  } catch (err) {
    sendJSONresponse(res, 500, { message: "Error retrieving trips", error: err });
  }
};

// GET /api/trips/:tripid
const tripsFindById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripid).exec();
    if (!trip) return sendJSONresponse(res, 404, { message: "Trip not found" });
    sendJSONresponse(res, 200, trip);
  } catch (err) {
    sendJSONresponse(res, 400, { message: "Invalid trip id", error: err });
  }
};

// POST /api/trips
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });
    sendJSONresponse(res, 201, trip);
  } catch (err) {
    sendJSONresponse(res, 400, { message: "Error creating trip", error: err });
  }
};

// PUT /api/trips/:tripid
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripid).exec();
    if (!trip) return sendJSONresponse(res, 404, { message: "Trip not found" });

    trip.code = req.body.code ?? trip.code;
    trip.name = req.body.name ?? trip.name;
    trip.length = req.body.length ?? trip.length;
    trip.start = req.body.start ?? trip.start;
    trip.resort = req.body.resort ?? trip.resort;
    trip.perPerson = req.body.perPerson ?? trip.perPerson;
    trip.image = req.body.image ?? trip.image;
    trip.description = req.body.description ?? trip.description;

    const saved = await trip.save();
    sendJSONresponse(res, 200, saved);
  } catch (err) {
    sendJSONresponse(res, 400, { message: "Error updating trip", error: err });
  }
};

// DELETE /api/trips/:tripid
const tripsDeleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.tripid).exec();
    if (!deleted) return sendJSONresponse(res, 404, { message: "Trip not found" });
    sendJSONresponse(res, 204, null);
  } catch (err) {
    sendJSONresponse(res, 400, { message: "Error deleting trip", error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindById,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};