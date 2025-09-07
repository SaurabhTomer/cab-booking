const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Ride = require('../models/Ride');
const { JWT_SECRET } = require('../config');

// -------------------- Middleware to authenticate driver --------------------
const authenticateDriver = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({ error: "Access denied" });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        if(verified.role !== 'driver') return res.status(403).json({ error: "Not a driver" });
        req.driver = verified;
        next();
    } catch(err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

// -------------------- Add a ride --------------------
router.post('/add-ride', authenticateDriver, async (req, res) => {
    const { source, destination, price, availableSeats } = req.body;
    try {
        const ride = new Ride({
            driverId: req.driver.id,
            source,
            destination,
            price,
            availableSeats,
            liveLocation: { lat: 0, lng: 0 } // default location
        });

        await ride.save();
        res.json({ message: "Ride added successfully", ride });

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------- Get all rides for this driver --------------------
router.get('/my-rides', authenticateDriver, async (req, res) => {
    try {
        const rides = await Ride.find({ driverId: req.driver.id });
        res.json(rides);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------- Update live location --------------------
router.put('/update-location/:rideId', authenticateDriver, async (req, res) => {
    const { rideId } = req.params;
    const { lat, lng } = req.body;

    try {
        const ride = await Ride.findById(rideId);
        if(!ride) return res.status(404).json({ error: "Ride not found" });

        if(ride.driverId.toString() !== req.driver.id) 
            return res.status(403).json({ error: "You cannot update this ride" });

        ride.liveLocation = { lat, lng };
        await ride.save();

        res.json({ message: "Location updated", liveLocation: ride.liveLocation });

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
