module.exports = ({ database }) => ({
    create: model => ({
        create: async object => {
            const result = await database.collection(model).insertOne(object)
            const [createdObject] = result.ops
            return createdObject
        },
        update: async (objectId, object) => {
            const result = await database.collection(model).findOneAndUpdate({ _id: mongoId(objectId) }, {'$set': object})
            const updatedObject = result.value
            return updatedObject
        },
        get: async objectId => {
            const result = await database.collection(model).findOne({ _id: mongoId(objectId) })
            return result
        },
        find: async query => {
            const result = await database.collection(model).find(query) 
            return result
        },
        aggregate: async pipeline => {
            const cursor = await database.collection(model).aggregate(pipeline)
            const docs = []
            await cursor.forEach(result => docs.push(result))
            return docs
        }
    })
})