const WeeklyCalorie = require('../models/WeeklyCalorie');
const User = require('../models/User');

async function getWeekly(req, res){
    try{
        const calories = await WeeklyCalorie.find();

        if(calories){
            res.status(200).json({ success: true, data: calories });
        } else {
            res.status(404).json({ success: false, message: 'Calories not found!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addWeekly(req, res){
    try{
        const { u_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
        
        const id = await User.findById(u_id);
        if(!id || !id.is_active){
            return res.status(400).json({ success: false, message: 'User not found!' });
        }

        const weekly = new WeeklyCalorie({
            u_id: u_id,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
            date_time: Date.now(),
            is_active: true
        });

        const savedWeekly = await weekly.save();
        if(savedWeekly) {
            res.status(201).json({ success: true, data: savedWeekly });
        } else {
            res.status(500).json({ success: false, message: 'Weekly error!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateMonday(req, res){
    try{
        const id = req.params.id;
        const { day } = req.body;

        const weekly = await WeeklyCalorie.findById(id);
        if(!weekly) {
            return res.status(404).json({ success: false, message: 'Weekly not found!' });
        }

        weekly.monday = day;
        weekly.save();

        res.status(200).json({ success: true, message: 'Weekly updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateTuesday(req, res){
    try{
        const id = req.params.id;
        const { day } = req.body;

        const weekly = await WeeklyCalorie.findById(id);
        if(!weekly) {
            return res.status(404).json({ success: false, message: 'Weekly not found!' });
        }

        weekly.tuesday = day;
        weekly.save();

        res.status(200).json({ success: true, message: 'Weekly updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateWednesday(req, res){
    try{
        const id = req.params.id;
        const { day } = req.body;

        const weekly = await WeeklyCalorie.findById(id);
        if(!weekly) {
            return res.status(404).json({ success: false, message: 'Weekly not found!' });
        }

        weekly.wednesday = day;
        weekly.save();

        res.status(200).json({ success: true, message: 'Weekly updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateThursday(req, res){
    try{
        const id = req.params.id;
        const { day } = req.body;

        const weekly = await WeeklyCalorie.findById(id);
        if(!weekly) {
            return res.status(404).json({ success: false, message: 'Weekly not found!' });
        }

        weekly.thursday = day;
        weekly.save();

        res.status(200).json({ success: true, message: 'Weekly updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateFriday(req, res){
    try{
        const id = req.params.id;
        const { day } = req.body;

        const weekly = await WeeklyCalorie.findById(id);
        if(!weekly) {
            return res.status(404).json({ success: false, message: 'Weekly not found!' });
        }

        weekly.friday = day;
        weekly.save();

        res.status(200).json({ success: true, message: 'Weekly updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateSaturday(req, res){
    try{
        const id = req.params.id;
        const { day } = req.body;

        const weekly = await WeeklyCalorie.findById(id);
        if(!weekly) {
            return res.status(404).json({ success: false, message: 'Weekly not found!' });
        }

        weekly.saturday = day;
        weekly.save();

        res.status(200).json({ success: true, message: 'Weekly updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateSunday(req, res){
    try{
        const id = req.params.id;
        const { day } = req.body;

        const weekly = await WeeklyCalorie.findById(id);
        if(!weekly) {
            return res.status(404).json({ success: false, message: 'Weekly not found!' });
        }

        weekly.sunday = day;
        weekly.save();

        res.status(200).json({ success: true, message: 'Weekly updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteWeekly(req, res){
    try{
        const id = req.params.id;
        const weekly = await WeeklyCalorie.findById(id);

        if(!weekly) {
            res.status(404).json({ success: false, message: 'Weekly not found!' });
        } else {
            await weekly.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Weekly deleted successfully!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getWeeklyById(req, res){
    try{
        const id = req.params.id;
        const weekly = await WeeklyCalorie.findById(id);

        if(weekly && weekly.is_active === true){
            res.status(200).json({ success: true, data: weekly });
        } else {
            res.status(404).json({ success: false, error: 'Todo not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getWeekly,
    addWeekly,
    updateMonday,
    updateTuesday,
    updateWednesday,
    updateThursday,
    updateFriday,
    updateSaturday,
    updateSunday,
    deleteWeekly,
    getWeeklyById
};