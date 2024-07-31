const express = require('express');
const router = express.Router();
const { getUserProgram, addUserProgram, updateName, updateDescription, updateDuration, updateTime, deleteUserProgram, getUserProgramById, total } = require('../controllers/userProgram');

router.route('/get').get(getUserProgram);
router.route('/add').post(addUserProgram);
router.route('/updateName/:id').put(updateName);
router.route('/updateDescription/:id').put(updateDescription);
router.route('/updateDuration/:id').put(updateDuration);
router.route('/updateTime/:id').put(updateTime);
router.route('/delete/:id').patch(deleteUserProgram);
router.route('/byId/:id').get(getUserProgramById);
router.route('/total/:id').get(total);

module.exports = router;