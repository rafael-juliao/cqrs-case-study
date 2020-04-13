module.exports = ({ collectionName }) => ({ database }) => {
    const collection = database.collection(collectionName);
    const { mongoId } = database
    return {
        collection,
        
        create: async object => {
            const result = await collection.insertOne(object)
            const [createdObject] = result.ops
            return createdObject
        },
        update: async (objectId, object) => {
            const result = await collection.findOneAndUpdate({ _id: mongoId(objectId) }, {'$set': object})
            const updatedObject = result.value
            return updatedObject
        },
        get: async objectId => {
            const result = await collection.findOne({ _id: mongoId(objectId) })
            return result
        },
        find: async query => {
            const result = await collection.find(query) 
            return result
        },
        aggregate: async aggregation => {
            const result = await collection.aggregate(aggregation)
            return result
        }
    }
}