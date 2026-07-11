import express from "express";

export const taskValidation = async function (req, res, next) {
    const body = req.body;
    if (body) {

        const titleInBody = body.hasOwnProperty("title");
        const courseInBody = body.hasOwnProperty("course");
        const completedInBody = body.hasOwnProperty("completed");
        
        req.Task = {}
        if (!titleInBody) {
            res.status(400).json({error: "Missing 'title' field" })
            return
        }
        if (!courseInBody) {
            res.status(400).json({error: "Missing 'course' field" })
            return
        }
        if (!completedInBody) {
            res.status(400).json({error: "Missing 'status' field" })
            return
        }
        if (body.course.trim() === '') {
            res.status(400).json({error: "Course must be non-empty" })
            return
        }
        if (body.title.trim() === '') {
            res.status(400).json({error: "Title must be non-empty" })
            return
        }

        req.Task.title = body.title
        req.Task.completed = body.completed
        req.Task.course = body.course
    }
    next();
};


export const taskUpdateValidation = async function (req, res, next) {
    const body = req.body;
    if (body) {

        const titleInBody = body.hasOwnProperty("title");
        const courseInBody = body.hasOwnProperty("course");
        const completedInBody = body.hasOwnProperty("completed");
        
        req.Task = {}
        if (!titleInBody) {
            res.status(400).json({error: "Missing 'title' field" })
            return
        }
        if (!courseInBody) {
            res.status(400).json({error: "Missing 'course' field" })
            return
        }
        if (!completedInBody) {
            res.status(400).json({error: "Missing 'status' field" })
            return
        }
        if (body.course.trim() === '') {
            res.status(400).json({error: "Course must be non-empty" })
            return
        }
        if (body.title.trim() === '') {
            res.status(400).json({error: "Title must be non-empty" })
            return
        }
        if (req.method == 'PUT' || req.method == "PATCH" ) {
            if (req.params.id) {
                
                req.Task.id = req.params.id
            }
        }
        req.Task.title = body.title
        req.Task.completed = body.completed
        req.Task.course = body.course
    }
    next();
};