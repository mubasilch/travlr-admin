const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const { requireAuth } = require('../middleware/auth');

// PUBLIC ROUTES
router.get('/trips', ctrlTrips.tripsList);
router.get('/trips/:tripid', ctrlTrips.tripsFindById);

// PROTECTED ADMIN ROUTES (require JWT)
router.post('/trips', requireAuth, ctrlTrips.tripsAddTrip);
router.put('/trips/:tripid', requireAuth, ctrlTrips.tripsUpdateTrip);
router.delete('/trips/:tripid', requireAuth, ctrlTrips.tripsDeleteTrip);

module.exports = router;