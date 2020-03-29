import logger from '../../.arch/src/Logger.mjs'
import HttpServer from '../../.arch/src/HttpServer.mjs'
import productsController from './ProductsController.mjs'

export default () => {
    logger.info('[HTTP] Creating products controller')
    const { Router } = HttpServer
    const productsRouter = Router()
    productsRouter.post('/products', productsController.createProduct)
    productsRouter.patch('/products/:productId/status', productsController.changeStatus)
    return productsRouter
}