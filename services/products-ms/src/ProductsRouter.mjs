import arch from '@rafael-juliao/lib-microservice'
const {
    Logger: logger,
    HttpServer: { Router },
} = arch
import productsController from './ProductsController.mjs'

export default () => {
    logger.info('[HTTP] Creating products controller')
    const productsRouter = Router()
    productsRouter.get('/products/:productId', productsController.getProduct)
    productsRouter.post('/products', productsController.createProduct)
    productsRouter.patch('/products/:productId/status', productsController.changeStatus)
    return productsRouter
}