const express = require('express');
const router = express.Router();
const { getUser, updateName, updateEmail, updatePassword, deleteUser, getUserById } = require('../controllers/user');

router.route('/get').get(getUser);
router.route('/updateName/:id').put(updateName);
router.route('/updateEmail/:id').put(updateEmail);
router.route('/updatePassword/:id').put(updatePassword);
router.route('/delete/:id').patch(deleteUser);
router.route('/byId/:id').get(getUserById);

module.exports = router;