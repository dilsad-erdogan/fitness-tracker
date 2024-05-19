const express = require('express');
const router = express.Router();
const { getMovement, addMovement, updateDescription, updatePhoto, updateVideo, deleteMovement, getMovementById } = require('../controllers/movement');

router.route('/get').get(getMovement);
router.route('/add').post(addMovement);
router.route('/updateDescription/:id').put(updateDescription);
router.route('/updatePhoto/:id').put(updatePhoto);
router.route('/updateVideo/:id').put(updateVideo);
router.route('/delete/:id').patch(deleteMovement);
router.route('/byId/:id').get(getMovementById);

module.exports = router;