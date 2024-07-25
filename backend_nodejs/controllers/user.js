const User = require('../models/User');

async function getUser (req, res) {
    try{
        const users = await User.find();

        if(users) {
            res.status(200).json({ success: true, data: users })
        } else {
            res.status(404).json({ success: false, message: 'User not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function updateName (req, res) {
    try{
        const u_id = req.params.id;
        const { u_name } = req.body;

        const user = await User.findById(u_id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User name not found!' });
        }

        user.u_name = u_name;
        user.save();

        res.status(200).json({ success: true, message: 'User name updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateEmail (req, res) {
    try{
        const u_id = req.params.id;
        const { u_email } = req.body;

        const user = await User.findById(u_id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User email not found!' });
        }

        user.u_email = u_email;
        user.save();

        res.status(200).json({ success: true, message: 'User email updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updatePassword (req, res) {
    try{
        const u_id = req.params.id;
        const { u_password } = req.body;

        const user = await User.findById(u_id);
        if(!user) {
            return res.status(404).json({ success: false, message: 'User password not found!' });
        }

        user.u_password = u_password;
        user.save();

        res.status(200).json({ success: true, message: 'User password updated successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteUser (req, res) {
    try{
        const u_id = req.params.id;
        const user = await User.findById(u_id);

        if(!user) {
            res.status(404).json({ success: false, message: 'User not found!' });
        } else {
            await user.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'User deleted successfully.' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getUserById (req, res) {
    try{
        const u_id = req.params.id;
        const user = await User.findById(u_id);

        if(user && user.is_active === true){
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, error: 'User not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function total (req, res) {
    try{
        const users = await User.find();

        if(users.length > 0){
            res.status(200).json({ success: true, data: users.length });
        } else {
            res.status(404).json({ success: false, message: 'User not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getUser,
    updateName,
    updateEmail,
    updatePassword,
    deleteUser,
    getUserById,
    total
}