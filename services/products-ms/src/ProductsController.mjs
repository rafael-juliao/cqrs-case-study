import productsService from './ProductsService.mjs'
import productsPersistence from './ProductsPersistence.mjs'

export default {

    createProduct: async (req, res, next) => {
        try {
            const product = req.body
            const createdProduct = await productsService.create(product)
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

    changeStatus: async (req, res, next) => {
        try {
            const { productId } = req.params
            const { status } = req.body
            const product = await productsService.changeStatus(productId, status)
            res.status(200).json(product).end()
        } catch (err) {
            next(err)
        }
    }
    
}