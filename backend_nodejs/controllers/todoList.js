const Todolist = require('../models/TodoList');
const User = require('../models/User');

async function getTodoList(req, res) {
    try {
        const id = req.params.id;
        const lists = await Todolist.find({ u_id: id, is_active: true });

        if (lists) {
            res.status(200).json({ success: true, data: lists });
        } else {
            res.status(404).json({ success: false, message: 'List not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function addTodoList (req, res) {
    try{
        const { u_id, content } = req.body;
        
        const id = await User.findById(u_id);
        if(!id || !id.is_active){
            return res.status(400).json({ success: false, message: 'User not found!' });
        }

        const todoList = new Todolist({
            u_id: u_id,
            content: content,
            date_time: Date.now(),
            is_done: false,
            is_active: true
        });

        const savedList = await todoList.save();
        if(savedList) {
            res.status(201).json({ success: true, data: savedList });
        } else {
            res.status(400).json({ success: false, message: 'Todo List error!' });
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateContent (req, res) {
    try{
        const todo_id = req.params.id;
        const { content } = req.body;

        const todoList = await Todolist.findById(todo_id);
        if(!todoList) {
            return res.status(404).json({ success: false, message: 'Todo not found!' });
        }

        todoList.content = content;
        todoList.save();

        res.status(200).json({ success: true, message: 'Todo updated description successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function updateDone (req, res) {
    try{
        const todo_id = req.params.id;

        const todoList = await Todolist.findById(todo_id);
        if(!todoList) {
            return res.status(404).json({ success: false, message: 'Todo not found!' });
        }

        todoList.is_done = !todoList.is_done;
        todoList.save();

        res.status(200).json({ success: true, message: 'Todo updated successfully!' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

async function deleteTodoList (req, res) {
    try{
        const todo_id = req.params.id;
        const todoList = await Todolist.findById(todo_id);

        if(!todoList) {
            res.status(404).json({ success: false, message: 'Todo not found!' });
        } else {
            await todoList.updateOne({ is_active: false });
            res.status(200).json({ success: true, message: 'Todo deleted successfully!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

async function getTodoById (req, res) {
    try{
        const todo_id = req.params.id;
        const todoList = await Todolist.findById(todo_id);

        if(todoList && todoList.is_active === true){
            res.status(200).json({ success: true, data: todoList });
        } else {
            res.status(404).json({ success: false, error: 'Todo not found!' });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = {
    getTodoList,
    addTodoList,
    updateContent,
    updateDone,
    deleteTodoList,
    getTodoById
};