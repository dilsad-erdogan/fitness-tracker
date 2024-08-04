const express = require('express');
const router = express.Router();
const { getTodoList, addTodoList, updateContent, updateDone, deleteTodoList, getTodoById } = require('../controllers/todoList');

router.route('/get/:id').get(getTodoList);
router.route('/add').post(addTodoList);
router.route('/updateContent/:id').put(updateContent);
router.route('/updateDone/:id').put(updateDone);
router.route('/delete/:id').patch(deleteTodoList);
router.route('/byId/:id').get(getTodoById);

module.exports = router;