const express = require('express');
const router = express.Router();
const { getWeekly, addWeekly, updateMonday, updateTuesday, updateWednesday, updateThursday, updateFriday, updateSaturday, updateSunday, deleteWeekly, getWeeklyById } = require('../controllers/weeklyCalorie');

router.route('/get/:id').get(getWeekly);
router.route('/add').post(addWeekly);
router.route('/updateMonday/:id').put(updateMonday);
router.route('/updateTuesday/:id').put(updateTuesday);
router.route('/updateWednesday/:id').put(updateWednesday);
router.route('/updateThursday/:id').put(updateThursday);
router.route('/updateFriday/:id').put(updateFriday);
router.route('/updateSaturday/:id').put(updateSaturday);
router.route('/updateSunday/:id').put(updateSunday);
router.route('/delete/:id').patch(deleteWeekly);
router.route('/byId/:id').get(getWeeklyById);

module.exports = router;