// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = async() => {
    const rows = await db('tasks as t')
    .join('projects as p', 't.project_id','p.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
    return rows.map((task) => {
        return {
            ...task,
            task_completed: task.task_completed === 1
        }
    })
}

const findById = async (id) => {
    const rows = await db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
    .where('task_id', id).first()
    return {...rows, task_completed: rows.task_completed ? true : false}
}
const create = async (task) => {
    const [id] = await db('tasks').insert(task)
    return findById(id)

}
module.exports = {
    getAll,
    create
}