const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Applicant = require('../models/Applicant');

const router = express.Router();
const upload = require('../config/upload');

// Register Applicant
router.post('/register', async (req, res) => {
    const { name, email, password, skillset, jobTitle, jobExperience, mobileNumber, workPreference } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newApplicant = new Applicant({
            name, email, password: hashedPassword, skillset, jobTitle, jobExperience, mobileNumber, workPreference
        });
        await newApplicant.save();
        res.status(201).json({ message: 'Applicant registered' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login Applicant
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const applicant = await Applicant.findOne({ email });

        if (!applicant) return res.status(400).json({ message: 'User not found' });
        if (!applicant || !await bcrypt.compare(password, applicant.password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: applicant._id }, process.env.JWT_SECRET, { expiresIn: '4d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Applicant Profile
router.get('/:id', async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        res.json(applicant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Applicant
router.put('/:id', async (req, res) => {
    try {
        const updatedApplicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedApplicant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload Applicant Documents (Resume, Cover Letter, etc.)
router.post('/upload/:id', upload.single('file'), async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndUpdate(req.params.id, { jobProfileResume: req.file.path }, { new: true });
        res.json(applicant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Define your routes
router.post('/upload/:id', upload.single('file'), async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndUpdate(req.params.id, {
            jobProfileResume: req.file.path
        }, { new: true });
        res.json(applicant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
