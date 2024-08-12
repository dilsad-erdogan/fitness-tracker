// routes/logs.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MongoDB'de logları sakladığın koleksiyonun modelini oluştur
const Log = mongoose.model('loggings', new mongoose.Schema({}, { strict: false }));

// GET /logs
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(50); // Son 100 logu çek
        res.json(logs);
    } catch (error) {
        res.status(500).send('Sunucu hatası');
    }
});

module.exports = router;