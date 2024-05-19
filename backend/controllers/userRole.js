const UserRole = require('../models/UserRole');

async function getUserRole (req, res) {
    try{
        const ur = await UserRole.find();

        if(ur) {
            res.status(200).json({ success: true, data: ur })
        } else {
            res.status(404).json({ success: false, message: 'User role not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addUserRole (req, res) {
    try{
        const { r_name } = req.body;

        const ur = new UserRole({
            r_name: r_name,
            date_time: Date.now(),
            is_active: true
        });

        const savedUserRole = await ur.save();
        if(savedUserRole) {
            res.status(201).json({ success: true, data: savedUserRole });
        } else {
            res.status(400).json({ success: false, message: 'User role error!' })
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateUserRole (req, res) {
    try{
        const ur_id = req.params.id;
        const { r_name } = req.body;

        const ur = await UserRole.findById(ur_id);
        if(!ur) {
            return res.status(404).json({ success: false, message: 'User role not found!' });
        }

        ur.r_name = r_name;
        ur.save();

        res.status(200).json({ success: true, message: 'User role updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteUserRole (req, res) {
    try{
        const ur_id = req.params.id;
        const ur = await UserRole.findById(ur_id);

        if(!ur) {
            res.status(404).json({ success: false, message: 'User role not found!' });
        } else {
            await ur.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'User role deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getUserRoleById (req, res) {
    try{
        const ur_id = req.params.id;
        const ur = await UserRole.findById(ur_id);

        if(ur && ur.is_active === true){
            res.status(200).json({ success: true, data: ur });
        } else {
            res.status(404).json({ success: false, error: 'User role not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getUserRole,
    addUserRole,
    updateUserRole,
    deleteUserRole,
    getUserRoleById
}