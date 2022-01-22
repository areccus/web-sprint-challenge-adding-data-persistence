// build your `Project` model here
const db = require('../../data/dbConfig')

const getAll = async() => {
    const rows = await db('projects')

    return rows.map((project) => {
        return {
            ...project,
            project_completed: project.project_completed === 1
        }
    })
}

const findById = async (id) => {
    const rows = await db('projects').where('project_id', id).first()
    return {...rows, project_completed: rows.project_completed ? true : false}
}
const create = async (project) => {
    const [id] = await db('projects').insert(project)
    return findById(id)

}
module.exports = {
    getAll,
    create
}