const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    contactPersons: [{
        name: String,
        role: String
    }],
    jobProfile: String,
    jobExperience: String,
    address: String,
    workPreference: { type: String, enum: ['WFH', 'WFO'], default: 'WFO' },
    projectPosting: String, // URL to GitHub, Google Drive, etc.
    internshipExperienceLetter: String // URL or path to experience letter PDF
});

module.exports = mongoose.model('Employer', employerSchema);
