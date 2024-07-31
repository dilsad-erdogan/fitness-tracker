const express = require('express');
const router = express.Router();
const { getTodoList, addTodoList, updateContent, deleteTodoList, getTodoById } = require('../controllers/todoList');

router.route('/get/:id').get(getTodoList);
router.route('/add').post(addTodoList);
router.route('/update/:id').put(updateContent);
router.route('/delete/:id').patch(deleteTodoList);
router.route('/byId/:id').get(getTodoById);

module.exports = router;