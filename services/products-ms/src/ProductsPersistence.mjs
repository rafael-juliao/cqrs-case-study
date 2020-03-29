import mongoDB from '../../.arch/src/MongoDB.mjs'
const { objectId } = mongoDB

export default {
    create: async product => {
        try {
            const result = await mongoDB.collection('products').insertOne(product)
            const [createdProduct] = result.ops
            return createdProduct
        } catch(err) {
            throw new Error('500|Failed to insert product in database')            
        }
    },
    update: async (productId, product) => {
        try {
            const result = await mongoDB.collection('products').findOneAndUpdate({ _id: objectId(productId) }, {'$set': product})
            const updatedProduct = result.value
            return updatedProduct
        } catch(err) {
            throw new Error(`500|Failed to update product ${productId} in database`)
        }
    }
}