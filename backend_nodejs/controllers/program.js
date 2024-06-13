const Program = require('../models/Program');

async function getProgram (req, res) {
    try{
        const program = await Program.find();

        if(program) {
            res.status(200).json({ success: true, data: program })
        } else {
            res.status(404).json({ success: false, message: 'Program not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addProgram (req, res) {
    try{
        const { p_name, p_description, duration, time } = req.body;

        const program = new Program({
            p_name: p_name,
            p_description: p_description,
            duration: duration,
            time: time,
            date_time: Date.now(),
            is_active: true
        });

        const savedProgram = await program.save();
        if(savedProgram) {
            res.status(201).json({ success: true, data: savedProgram });
        } else {
            res.status(400).json({ success: false, message: 'Movement error!' })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateName (req, res) {
    try{
        const p_id = req.params.id;
        const { p_name } = req.body;

        const program = await Program.findById(p_id);
        if(!program) {
            return res.status(404).json({ success: false, message: 'Program not found!' });
        }

        program.p_name = p_name;
        program.save();

        res.status(200).json({ success: true, message: 'Program updated name successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateDescription (req, res) {
    try{
        const p_id = req.params.id;
        const { p_description } = req.body;

        const program = await Program.findById(p_id);
        if(!program) {
            return res.status(404).json({ success: false, message: 'Program not found!' });
        }

        program.p_description = p_description;
        program.save();

        res.status(200).json({ success: true, message: 'Program updated description successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateDuration (req, res) {
    try{
        const p_id = req.params.id;
        const { duration } = req.body;

        const program = await Program.findById(p_id);
        if(!program) {
            return res.status(404).json({ success: false, message: 'Program not found!' });
        }

        program.duration = duration;
        program.save();

        res.status(200).json({ success: true, message: 'Program updated duration successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateTime (req, res) {
    try{
        const p_id = req.params.id;
        const { time } = req.body;

        const program = await Program.findById(p_id);
        if(!program) {
            return res.status(404).json({ success: false, message: 'Program not found!' });
        }

        program.time = time;
        program.save();

        res.status(200).json({ success: true, message: 'Program updated time successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteProgram (req, res) {
    try{
        const p_id = req.params.id;
        const program = await Program.findById(p_id);

        if(!program) {
            res.status(404).json({ success: false, message: 'Program not found!' });
        } else {
            await program.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Program deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getProgramById (req, res) {
    try{
        const p_id = req.params.id;
        const program = await Program.findById(p_id);

        if(program && program.is_active === true){
            res.status(200).json({ success: true, data: program });
        } else {
            res.status(404).json({ success: false, error: 'Program not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getProgram,
    addProgram,
    updateName,
    updateDescription,
    updateDuration,
    updateTime,
    deleteProgram,
    getProgramById
}