import { taskUpdateValidation, taskValidation } from "../middleware/taskHandler.js";
import express from "express";


export async function StartTasksController(app: express.Application, tasks: Array<Object>, nextId: Number) {
    const getTask = async (req: express.Request, res: express.Response) => {
        let taskFound: boolean = false;
        for (const item of tasks) {
            if (item.id == req.params.id) {
                taskFound = true;
                res.json( item );
                return
            }
        }
        
        if (!taskFound) {
            res.status(404).json({ error: `Task ID ${req.params.id} not found` });
        }
    }
    
    const patchTask = async (req: express.Request, res: express.Response) => {

        let taskPatched: boolean = false;

        tasks.forEach((task, index) => {
            if (req.params.id == task.id) {
                tasks.splice(index, 1, req.Task)
                taskPatched = true;
                res.status(200).json({ "status": "success", data: req.Task})
            }
        })
        
        if (!taskPatched) {
           res.status(404).json({error: `Task with id ${req.params.id} does not exist`})
        }
    }
    
    const deleteTask = async (req: express.Request, res: express.Response) => {
        
        var IsTaskRemoved = false;
        
        tasks.forEach((task, index) => {
            if (task.id == req.params.id) {
                tasks.splice(index, 1)
                IsTaskRemoved = true;
            }
        })
        
        if (!IsTaskRemoved) {
            res.status(404).json({error: `Task with ID ${req.params.id} does not exist`})
        }
        
        res.status(201).json(`Task ${req.params.id} removed`);
    }

    const putTask = async (req: express.Request, res: express.Response) => {
        

        let taskReplaced: boolean = false;
        tasks.forEach((task, index) => {
            if (task.id == req.Task.id) {
                tasks.splice(index, 1, req.Task)
                taskReplaced = true;
                res.status(201).json( { "status": "success", data: req.Task} );
            }
        })
        
        
        if (!taskReplaced) {
            tasks.push(req.Task)
            res.status(201).json({ "status": "success", data: req.Task});
        }
    }

    app.get("/api/tasks", (req, res) => {
        res.json({ tasks });
    });


    app.route("/api/tasks/:id")
       .get(getTask)
       .delete(deleteTask)
       .patch([taskUpdateValidation, patchTask])
       .put([taskUpdateValidation, putTask])
        

    app.post("/api/tasks", taskValidation, (req, res) => {   
        req.Task.id = nextId
   
        tasks.push(req.Task)
        nextId++;
        res.status(201).json(req.Task);
    });

}