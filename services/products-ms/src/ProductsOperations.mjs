import arch from '@rafael-juliao/lib-microservice'
const { RabbitMQ: eventPublisher } = arch
import productsPersistence from './ProductsPersistence.mjs'
import ProductEvents from './ProductEvents.mjs'

export default {

    create: async product => {
        const createdProduct = await productsPersistence.create(product)
        await eventPublisher.publish(ProductEvents.PRODUCT_CREATED, createdProduct)
        return createdProduct
    },

    updateProduct: async (productId, product) => {
        const updatedProduct = await productsPersistence.update(productId, product)
        if (!updatedProduct) throw new Error(`404|Product ${productId} not found`)
        await eventPublisher.publish(ProductEvents.PRODUCT_UPDATED, updatedProduct)
        return updatedProduct
    }

}