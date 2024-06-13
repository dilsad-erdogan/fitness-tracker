const Movement = require('../models/Movement');
const MovemetTitle = require('../models/MovementTitle');

async function getMovement (req, res) {
    try{
        const movements = await Movement.find();

        if(movements) {
            res.status(200).json({ success: true, data: movements })
        } else {
            res.status(404).json({ success: false, message: 'Movement not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addMovement (req, res) {
    try{
        const { m_tid, m_name, m_description, m_photo, m_video } = req.body;

        const t_id = await MovemetTitle.findById(m_tid);

        if(!t_id || !t_id.is_active){
            return res.status(400).json({ success: false, message: 'Movement title not found!' });
        }

        const movement = new Movement({
            m_tid: m_tid,
            m_name: m_name,
            m_description: m_description,
            m_photo: m_photo,
            m_video: m_video,
            date_time: Date.now(),
            is_active: true
        });

        const savedMovement = await movement.save();
        if(savedMovement) {
            res.status(201).json({ success: true, data: savedMovement });
        } else {
            res.status(400).json({ success: false, message: 'Movement error!' })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateDescription (req, res) {
    try{
        const m_id = req.params.id;
        const { m_description } = req.body;

        const movement = await Movement.findById(m_id);
        if(!movement) {
            return res.status(404).json({ success: false, message: 'Movement description not found!' });
        }

        movement.m_description = m_description;
        movement.save();

        res.status(200).json({ success: true, message: 'Movement updated description successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updatePhoto (req, res) {
    try{
        const m_id = req.params.id;
        const { m_photo } = req.body;

        const movement = await Movement.findById(m_id);
        if(!movement) {
            return res.status(404).json({ success: false, message: 'Movement not found!' });
        }

        movement.m_photo = m_photo;
        movement.save();

        res.status(200).json({ success: true, message: 'Movement updated photo successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateVideo (req, res) {
    try{
        const m_id = req.params.id;
        const { m_video } = req.body;

        const movement = await Movement.findById(m_id);
        if(!movement) {
            return res.status(404).json({ success: false, message: 'Movement not found!' });
        }

        movement.m_video = m_video;
        movement.save();

        res.status(200).json({ success: true, message: 'Movement updated video successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteMovement (req, res) {
    try{
        const m_id = req.params.id;
        const movement = await Movement.findById(m_id);

        if(!movement) {
            res.status(404).json({ success: false, message: 'Movement not found!' });
        } else {
            await movement.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Movement deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getMovementById (req, res) {
    try{
        const m_id = req.params.id;
        const movement = await Movement.findById(m_id);

        if(movement && movement.is_active === true){
            res.status(200).json({ success: true, data: movement });
        } else {
            res.status(404).json({ success: false, error: 'Movement not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getMovement,
    addMovement,
    updateDescription,
    updatePhoto,
    updateVideo,
    deleteMovement,
    getMovementById
}