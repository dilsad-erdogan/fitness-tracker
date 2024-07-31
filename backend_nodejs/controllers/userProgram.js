const UserProgram = require('../models/UserProgram');
const User = require('../models/User');

async function getUserProgram (req, res) {
    try{
        const userProgram = await UserProgram.find();

        if(userProgram) {
            res.status(200).json({ success: true, data: userProgram })
        } else {
            res.status(404).json({ success: false, message: 'User Program not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addUserProgram (req, res) {
    try{
        const { up_uid, up_name, up_description, duration, time } = req.body;

        const userProgram = new UserProgram({
            up_uid: up_uid,
            up_name: up_name,
            up_description: up_description,
            duration: duration,
            time: time,
            date_time: Date.now(),
            is_active: true
        });

        const u_id = await User.findOne({ _id: up_uid });

        if(!u_id || u_id.is_active === false) {
            return res.status(400).json({ success: false, message: 'User not found!' });
        }

        const savedUserProgram = await userProgram.save();
        if(savedUserProgram) {
            res.status(201).json({ success: true, data: savedUserProgram });
        } else {
            res.status(400).json({ success: false, message: 'Saved user program error!' })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateName (req, res) {
    try{
        const up_id = req.params.id;
        const { up_name } = req.body;

        const userProgram = await UserProgram.findById(up_id);
        if(!userProgram) {
            return res.status(404).json({ success: false, message: 'User program not found!' });
        }

        userProgram.up_name = up_name;
        userProgram.save();

        res.status(200).json({ success: true, message: 'User program name updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateDescription (req, res) {
    try{
        const up_id = req.params.id;
        const { up_description } = req.body;

        const userProgram = await UserProgram.findById(up_id);
        if(!userProgram) {
            return res.status(404).json({ success: false, message: 'User program not found!' });
        }

        userProgram.up_description = up_description;
        userProgram.save();

        res.status(200).json({ success: true, message: 'User program description updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateDuration (req, res) {
    try{
        const up_id = req.params.id;
        const { duration } = req.body;

        const userProgram = await UserProgram.findById(up_id);
        if(!userProgram) {
            return res.status(404).json({ success: false, message: 'User program not found!' });
        }

        userProgram.duration = duration;
        userProgram.save();

        res.status(200).json({ success: true, message: 'User program duration updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateTime (req, res) {
    try{
        const up_id = req.params.id;
        const { time } = req.body;

        const userProgram = await UserProgram.findById(up_id);
        if(!userProgram) {
            return res.status(404).json({ success: false, message: 'User program not found!' });
        }
        
        userProgram.time = time;
        userProgram.save();

        res.status(200).json({ success: true, message: 'User program time updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteUserProgram (req, res) {
    try{
        const up_id = req.params.id;
        const userProgram = await UserProgram.findById(up_id);

        if(!userProgram) {
            res.status(404).json({ success: false, message: 'User program not found!' });
        } else {
            await userProgram.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'User program deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getUserProgramById (req, res) {
    try{
        const up_id = req.params.id;
        const userProgram = await UserProgram.findById(up_id);

        if(userProgram && userProgram.is_active === true){
            res.status(200).json({ success: true, data: userProgram });
        } else {
            res.status(404).json({ success: false, error: 'User program not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function total (req, res) {
    try{
        const u_id = req.params.id;
        const uPrograms = await UserProgram.find({ up_uid: u_id });

        if(uPrograms.length > 0){
            res.status(200).json({ success: true, data: uPrograms.length });
        } else {
            res.status(404).json({ success: false, message: 'User program not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getUserProgram,
    addUserProgram,
    updateName,
    updateDescription,
    updateDuration,
    updateTime,
    deleteUserProgram,
    getUserProgramById,
    total
}