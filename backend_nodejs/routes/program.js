const express = require('express');
const router = express.Router();
const { getProgram, addProgram, updateName, updateDescription, updateDuration, updateTime, deleteProgram, getProgramById, total } = require('../controllers/program');

router.route('/get').get(getProgram);
router.route('/add').post(addProgram);
router.route('/updateName/:id').put(updateName);
router.route('/updateDescription/:id').put(updateDescription);
router.route('/updateDuration/:id').put(updateDuration);
router.route('/updateTime/:id').put(updateTime);
router.route('/delete/:id').patch(deleteProgram);
router.route('/byId/:id').get(getProgramById);
router.route('/total').get(total);

module.exports = router;