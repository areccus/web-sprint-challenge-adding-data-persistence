// build your `/api/resources` router here
const router = require('express').Router()
const md = require('./model')

router.get('/', async(req, res, next) => {
    try {
        const resource = await md.getAll()
        res.json(resource)
    } catch(err) {
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const newResource = await md.create(req.body)
        res.status(201).json(newResource)
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