const Goals = require('../models/Goals');
const User = require('../models/User');

async function getGoaols(req, res) {
    try {
        const id = req.params.id;
        const goals = await Goals.find({ u_id: id, is_active: true });

        if (goals) {
            res.status(200).json({ success: true, data: goals });
        } else {
            res.status(404).json({ success: false, message: 'Goals not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addGoals (req, res) {
    try{
        const { u_id, content } = req.body;
        
        const id = await User.findById(u_id);
        if(!id || !id.is_active){
            return res.status(400).json({ success: false, message: 'User not found!' });
        }

        const goals = new Goals({
            u_id: u_id,
            content: content,
            date_time: Date.now(),
            is_done: false,
            is_active: true
        });

        const savedGoal = await goals.save();
        if(savedGoal) {
            res.status(201).json({ success: true, data: savedGoal });
        } else {
            res.status(400).json({ success: false, message: 'Goals List error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateContent (req, res) {
    try{
        const goal_id = req.params.id;
        const { content } = req.body;

        const goals = await Goals.findById(goal_id);
        if(!goals) {
            return res.status(404).json({ success: false, message: 'Goals not found!' });
        }

        goals.content = content;
        goals.save();

        res.status(200).json({ success: true, message: 'Goals updated content successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateDone (req, res) {
    try{
        const goal_id = req.params.id;

        const goals = await Goals.findById(goal_id);
        if(!goals) {
            return res.status(404).json({ success: false, message: 'Goals not found!' });
        }

        goals.is_done = !goals.is_done;
        goals.save();

        res.status(200).json({ success: true, message: 'Goals updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteContent (req, res) {
    try{
        const goal_id = req.params.id;
        const goals = await Goals.findById(goal_id);

        if(!goals) {
            res.status(404).json({ success: false, message: 'Goals not found!' });
        } else {
            await goals.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Goals deleted successfully!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getGoalById (req, res) {
    try{
        const goal_id = req.params.id;
        const goals = await Goals.findById(goal_id);

        if(goals && goals.is_active === true){
            res.status(200).json({ success: true, data: goals });
        } else {
            res.status(404).json({ success: false, error: 'Goals not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getGoaols,
    addGoals,
    updateContent,
    updateDone,
    deleteContent,
    getGoalById
};