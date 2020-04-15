import eventPublisher from '../../.arch/src/RabbitMQ.mjs'
import productsPersistence from './ProductsPersistence.mjs'
import ProductEvents from './ProductEvents.mjs'

export default {

    create: async product => {
        const createdProduct = await productsPersistence.create(product)
        await eventPublisher.publish(ProductEvents.PRODUCT_CREATED, createdProduct)
        return createdProduct
    },

    changeStatus: async (productId, status) => {
        const product = await productsPersistence.update(productId, {status})
        if (!product) throw new Error(`404|Product ${productId} not found`)
        await eventPublisher.publish(ProductEvents.PRODUCT_STATUS_CHANGED, product)
        return product
    }

}