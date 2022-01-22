// build your `Resource` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('resources')
}

const findById = async (id) => {
   return db('resources').where('resource_id', id).first()
}
const create = async (resource) => {
    const [id] = await db('resources').insert(resource)
    return findById(id)

}
module.exports = {
    getAll,
    create
}