import productsOperations from './ProductsOperations.mjs'
import productsPersistence from './ProductsPersistence.mjs'

export default {

    createProduct: async (req, res, next) => {
        try {
            const product = req.body
            const createdProduct = await productsOperations.create(product)
            res.status(201).json(createdProduct).end()
        } catch (err) {
            next(err)
        }
    },


    getProduct: async (req, res, next) => {
        try {
            const { productId } = req.params
            const createdProduct = await productsPersistence.get(productId)
            res.status(200).json(createdProduct).end()
        } catch (err) {
            next(err)
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const { productId } = req.params
            const product = req.body
            const updatedProduct = await productsOperations.updateProduct(productId, product)
            res.status(200).json(updatedProduct).end()
        } catch (err) {
            next(err)
        }
    }
    
}