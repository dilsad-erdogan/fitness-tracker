const MovementTitle = require('../models/MovementTitle');

async function getMovementTitle (req, res) {
    try{
        const mt = await MovementTitle.find();

        if(mt) {
            res.status(200).json({ success: true, data: mt })
        } else {
            res.status(404).json({ success: false, message: 'Movement title not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addMovementTitle (req, res) {
    try{
        const { t_name } = req.body;

        const mt = new MovementTitle({
            t_name: t_name,
            date_time: Date.now(),
            is_active: true
        });

        const savedMT = await mt.save();
        if(savedMT) {
            res.status(201).json({ success: true, data: savedMT });
        } else {
            res.status(400).json({ success: false, message: 'Movement title error!' })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateMovementTitle (req, res) {
    try{
        const mt_id = req.params.id;
        const { t_name } = req.body;

        const mt = await MovementTitle.findById(mt_id);
        if(!mt) {
            return res.status(404).json({ success: false, message: 'Movement title not found!' });
        }

        mt.t_name = t_name;
        mt.save();

        res.status(200).json({ success: true, message: 'Movement title updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteMovementTitle (req, res) {
    try{
        const mt_id = req.params.id;
        const mt = await MovementTitle.findById(mt_id);

        if(!mt) {
            res.status(404).json({ success: false, message: 'Movement title not found!' });
        } else {
            await mt.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Movement title deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getMovementTitleById (req, res) {
    try{
        const mt_id = req.params.id;
        const mt = await MovementTitle.findById(mt_id);

        if(mt && mt.is_active === true){
            res.status(200).json({ success: true, data: mt });
        } else {
            res.status(404).json({ success: false, error: 'Movement title not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getMovementTitle,
    addMovementTitle,
    updateMovementTitle,
    deleteMovementTitle,
    getMovementTitleById
}