const HeightWeight = require('../models/HeightWeight');
const User = require('../models/User');

async function getHeightWeight (req, res) {
    try{
        const hw = await HeightWeight.find({ is_active: true });

        if(hw) {
            res.status(200).json({ success: true, data: hw })
        } else {
            res.status(404).json({ success: false, message: 'Height weight not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addHeightWeight (req, res) {
    try{
        const { hw_uid, height, weight } = req.body;

        const u_id = await User.findById(hw_uid);

        if(!u_id || !u_id.is_active) {
            return res.status(400).json({ success: false, message: 'User not found or inactive!' });
        }

        const hw = new HeightWeight({
            hw_uid: hw_uid,
            height: height,
            weight: weight,
            date_time: Date.now(),
            is_active: true
        });

        const savedHW = await hw.save();
        if(savedHW) {
            res.status(201).json({ success: true, data: savedHW });
        } else {
            res.status(400).json({ success: false, message: 'Height weight error!' })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateHeight (req, res) {
    try{
        const hw_id = req.params.id;
        const { height } = req.body;

        const hw = await HeightWeight.findById(hw_id);
        if(!hw) {
            return res.status(404).json({ success: false, message: 'Height not found!' });
        }

        hw.height = height;
        hw.save();

        res.status(200).json({ success: true, message: 'Height updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateWeight (req, res) {
    try{
        const hw_id = req.params.id;
        const { weight } = req.body;

        const hw = await HeightWeight.findById(hw_id);
        if(!hw) {
            return res.status(404).json({ success: false, message: 'Weight not found!' });
        }

        hw.weight = weight;
        hw.save();

        res.status(200).json({ success: true, message: 'Weight updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteHeightWeight (req, res) {
    try{
        const hw_id = req.params.id;
        const hw = await HeightWeight.findById(hw_id);

        if(!hw) {
            res.status(404).json({ success: false, message: 'Height weight not found!' });
        } else {
            await hw.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Height weight deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getHeightWeightById (req, res) {
    try{
        const id = req.params.id;
        const hw = await HeightWeight.findOne({ hw_uid: id, is_active: true });

        if(hw && hw.is_active === true){
            res.status(200).json({ success: true, data: hw });
        } else {
            res.status(404).json({ success: false, error: 'Height weight not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getHeightWeight,
    addHeightWeight,
    updateHeight,
    updateWeight,
    deleteHeightWeight,
    getHeightWeightById
}