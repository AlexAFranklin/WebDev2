const {Users} = require("../models");
const {Todos} = require("../models");
const validator = require('validator');
module.exports = {
    createTodo : async (req, res) => {
        const todo = req.body;
        try {
            if (!validateCreation(todo, req, res)){
                return;
            }
            const user = await Users.findAll({
                where: {
                    id: todo.UserId
                }
            })
            if (user.length < 1){
                return res.status(400).json({message : "Create post from valid user account", user: false})
            }
            const createdTodo = await Todos.create(todo);
            if (createdTodo.id) {
                return res.status(201).json(createdTodo)
            } else {
                return res.status(500).json({message: "something went wrong creating your todo."})
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }


    }, 
    updateToComplete : async (req, res) => {
        const updateTodo = req.body; 
        const updateId = req.params.id;
        try {
            if (!validatePatch(updateTodo, req, res)) {
                return;
            }

            const todo = await Todos.findByPk(updateId)
            if (todo === null) {
                return res.status(400).json({ message: "Item Not Found" });
            }
            const oldIsDone = todo.isDone;
            if (oldIsDone == updateTodo.isDone) {
                return res.status(400).json({ message: "Not setting update" });
            }
            if (todo.UserId !== updateTodo.UserId) {
                return res.status(400).json({ message: "Cannot update other users" });
            }
            todo.isDone = updateTodo.isDone;
            const finalTodo = await todo.save();
            if (finalTodo.isDone !== oldIsDone) {
                res.status(200).json(finalTodo) 
            } else {
                res.status(400).json({message: "Not updating"}) 
            }            

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    deleteTodo : async (req, res) => {
        try {
            const updateTodo = req.body; 
            const updateId = req.params.id;

            const todo = await Todos.findByPk(updateId)
            if (todo === null) {
                return res.status(400).json({ message: "Item Not Found" });
            }
           
            todo.isVisible = 0;
            const finalTodo = await todo.save();
            if (finalTodo.isVisible == 0) {
                return res.status(200).json({ message: "Item was successfully deleted", isDeleted: true });
            }
            return res.status(400).json({ message: "Item was not deleted", isDeleted: false });

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    findById : async (req, res) => {
        try {
            const todoId = req.params.id;
            const todo = await Todos.findByPk(todoId, {
                where: {
                    isVisible: 1
                }
            })
            // TODOAPI : figure out why above is not working?
            if (todo.isVisible === 0) {
                return res.status(400).json({message: "that article does not exist"});
            }
            res.status(200).json(todo);

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    viewAll : async (req, res) => {
        const userId = req.params.id;
        try {
            const listOfTodos = await Todos.findAll({
                where: {
                    isVisible: 1,
                    UserId: userId
                }
            })
            res.status(200).json(listOfTodos);

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

}

function validateCreation(todo, req, res){
    if (todo.UserId == undefined || todo.task == undefined || todo.dueDate == undefined ) {
        res.status(400).send({
            message: "Please fill out required fields"
        });
        return false;
    }
    if (!validator.isLength(todo.task, {min: 1, max:100})) {
        res.status(400).send({
            message: "Task must be between 1 and 100 characters long."
        });
        return false;
    }
    // if (!validator.isDate(todo.dueDate.toString())) {
    //     res.status(400).send({
    //         message: "Select a date for the due date."
    //     });
    //     return false;
    // }
    // if (!validator.isAfter(todo.dueDate.toString())) {
    //     res.status(400).send({
    //         message: "Please select a valid date. Must be after today."
    //     });
    //     return false;
    // }

    return true;
}

function validatePatch(todo, req, res) {
    console.log("Patch")

    if (todo.UserId === undefined || todo.isDone === undefined) {
        res.status(400).send({
            message: "Please fill out required fields"
        });
        return false;
    } 
    if (isNaN(todo.isDone)) {
        res.status(400).send({
            message: "isDone must be a number"
        });
        return false;
    } 
    if (todo.isDone > 1 || todo.isDone < 0){
        res.status(400).send({
            message: "Must be true or false"
        });
        return false;
    }

    return true;
}
 