const express = require('express');
const Employer = require('../models/Employer');
const upload = require('../app').upload;
const router = express.Router();

// Register Employer
router.post('/register', async (req, res) => {
    const { companyName, contactPersons, jobProfile, jobExperience, address, workPreference } = req.body;
    try {
        const newEmployer = new Employer({ companyName, contactPersons, jobProfile, jobExperience, address, workPreference });
        await newEmployer.save();
        res.status(201).json({ message: 'Employer registered' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Employer Profile
router.get('/:id', async (req, res) => {
    try {
        const employer = await Employer.findById(req.params.id);
        res.json(employer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Employer
router.put('/:id', async (req, res) => {
    try {
        const updatedEmployer = await Employer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
