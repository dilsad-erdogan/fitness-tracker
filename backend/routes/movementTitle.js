const express = require('express');
const router = express.Router();
const { getMovementTitle, addMovementTitle, updateMovementTitle, deleteMovementTitle, getMovementTitleById } = require('../controllers/movementTitle');

router.route('/get').get(getMovementTitle);
router.route('/add').post(addMovementTitle);
router.route('/update/:id').put(updateMovementTitle);
router.route('/delete/:id').patch(deleteMovementTitle);
router.route('/byId/:id').get(getMovementTitleById);

module.exports = router;