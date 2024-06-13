const express = require('express');
const router = express.Router();
const { getUserRole, addUserRole, updateUserRole, deleteUserRole, getUserRoleById } = require('../controllers/userRole');

router.route('/get').get(getUserRole);
router.route('/add').post(addUserRole);
router.route('/update/:id').put(updateUserRole);
router.route('/delete/:id').patch(deleteUserRole);
router.route('/byId/:id').get(getUserRoleById);

module.exports = router;