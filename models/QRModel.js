
const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('QRCode', qrCodeSchema);
// This code defines a Mongoose schema for a QR code model, which includes fields for user