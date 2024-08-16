const express = require('express');
const router = express.Router();
const { getGoaols, addGoals, updateContent, updateDone, deleteContent, getGoalById } = require('../controllers/goals');

router.route('/get/:id').get(getGoaols);
router.route('/add').post(addGoals);
router.route('/updateContent/:id').put(updateContent);
router.route('/updateDone/:id').put(updateDone);
router.route('/delete/:id').patch(deleteContent);
router.route('/byId/:id').get(getGoalById);

module.exports = router;