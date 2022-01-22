// build your `/api/tasks` router here
const router = require('express').Router()
const md = require('./model')

router.get('/', async(req, res, next) => {
    try {
        const task = await md.getAll()
        console.log(task)
        res.json(task)
    } catch(err) {
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const {task_description} = req.body
        if(!task_description) {
            res.status(400).json({message: 'Missing description'})
        } else {
        const newTask = await md.create(req.body)
        res.status(201).json(newTask)
        }
    } catch(err) {
        next(err)
    }
})


router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router