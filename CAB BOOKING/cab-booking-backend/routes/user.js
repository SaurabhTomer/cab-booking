const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Ride = require('../models/Ride');
const Booking = require('../models/Booking');
const Driver = require('../models/Driver');
const { JWT_SECRET } = require('../config');

// -------------------- Middleware to authenticate user --------------------
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Expect: Bearer <token>
    if(!token) return res.status(401).json({ error: "Access denied" });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

// -------------------- GET all available rides --------------------
router.get('/rides', authenticateUser, async (req, res) => {
    try {
        const rides = await Ride.find().populate('driverId', 'name car ratings');
        res.json(rides);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------- Book a ride --------------------
router.post('/book', authenticateUser, async (req, res) => {
    const { rideId } = req.body;
    try {
        const ride = await Ride.findById(rideId);
        if(!ride) return res.status(404).json({ error: "Ride not found" });

        if(ride.availableSeats <= 0) return res.status(400).json({ error: "No seats available" });

        // Create a booking
        const booking = new Booking({
            rideId,
            userId: req.user.id,
            price: ride.price
        });

        await booking.save();

        // Reduce available seats
        ride.availableSeats -= 1;
        ride.bookings.push(booking._id);
        await ride.save();

        res.json({ message: "Ride booked successfully", booking });

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------- Rate a driver --------------------
router.post('/rate', authenticateUser, async (req, res) => {
    const { driverId, rating } = req.body;
    try {
        const driver = await Driver.findById(driverId);
        if(!driver) return res.status(404).json({ error: "Driver not found" });

        driver.ratings.push(rating);
        await driver.save();

        res.json({ message: "Driver rated successfully", ratings: driver.ratings });

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
