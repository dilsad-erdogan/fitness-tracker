const Set = require('../models/Set');
const Program = require('../models/Program');
const Movement = require('../models/Movement');

async function getSet (req, res) {
    try{
        const sets = await Set.find();

        if(sets) {
            res.status(200).json({ success: true, data: sets })
        } else {
            res.status(404).json({ success: false, message: 'Set not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addSet (req, res) {
    try {
        const { s_pid, s_mid } = req.body;

        const p_id = await Program.findById(s_pid);
        const m_id = await Movement.findById(s_mid);

        if (!p_id || !p_id.is_active) {
            return res.status(400).json({ success: false, message: 'Program not found or inactive!' });
        } else if (!m_id || !m_id.is_active) {
            return res.status(400).json({ success: false, message: 'Movement not found or inactive!' });
        }

        const set = new Set({
            s_pid: s_pid,
            s_mid: s_mid,
            date_time: Date.now(),
            is_active: true
        });

        const savedSet = await set.save();
        if (savedSet) {
            res.status(201).json({ success: true, data: savedSet });
        } else {
            res.status(400).json({ success: false, message: 'Set error!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteSet (req, res) {
    try{
        const s_id = req.params.id;
        const set = await Set.findById(s_id);

        if(!set) {
            res.status(404).json({ success: false, message: 'Set not found!' });
        } else {
            await set.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Set deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getSetById (req, res) {
    try{
        const s_id = req.params.id;
        const set = await Set.findById(s_id);

        if(set && set.is_active === true){
            res.status(200).json({ success: true, data: set });
        } else {
            res.status(404).json({ success: false, error: 'Set not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getSet,
    addSet,
    deleteSet,
    getSetById
}