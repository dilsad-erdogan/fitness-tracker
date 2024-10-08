const express = require('express');
const router = express.Router();
const { getSet, addSet, deleteSet, getSetById, getAllMovement } = require('../controllers/set');

router.route('/get').get(getSet);
router.route('/add').post(addSet);
router.route('/delete/:id').patch(deleteSet);
router.route('/byId/:id').get(getSetById);
router.route('/getMovement/:id').get(getAllMovement);

module.exports = router;