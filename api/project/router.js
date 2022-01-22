// build your `/api/projects` router here
const router = require('express').Router()
const md = require('./model')

router.get('/', async(req, res, next) => {
    try {
        const project = await md.getAll()
        res.json(project)
    } catch(err) {
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const newProject = await md.create(req.body)
        res.status(201).json(newProject)
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