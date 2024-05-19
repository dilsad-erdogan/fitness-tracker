const express = require('express');
const router = express.Router();
const { getHeightWeight, addHeightWeight, updateHeight, updateWeight, deleteHeightWeight, getHeightWeightById } = require('../controllers/heightWeight');

router.route('/get').get(getHeightWeight);
router.route('/add').post(addHeightWeight);
router.route('/updateHeight/:id').put(updateHeight);
router.route('/updateWeight/:id').put(updateWeight);
router.route('/delete/:id').patch(deleteHeightWeight);
router.route('/byId/:id').get(getHeightWeightById);

module.exports = router;