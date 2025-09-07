const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token authentication

const User = require('../models/User');
const Driver = require('../models/Driver');
const { JWT_SECRET } = require('../config');

// -------------------- SIGNUP --------------------
router.post('/signup', async (req, res) => {
    const { name, email, password, role, car } = req.body;
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if(role === 'driver') {
            newUser = new Driver({ name, email, password: hashedPassword, car });
        } else {
            newUser = new User({ name, email, password: hashedPassword });
        }

        await newUser.save();
        res.json({ message: "Signup successful" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// -------------------- LOGIN --------------------
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // Find user in DB
        let user;
        if(role === 'driver') user = await Driver.findOne({ email });
        else user = await User.findOne({ email });

        if(!user) return res.status(400).json({ error: "User not found" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ error: "Invalid password" });

        // Create JWT token
        const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, role });

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
