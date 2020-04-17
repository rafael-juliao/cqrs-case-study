import arch from '@rafael-juliao/lib-microservice'
const { RestClient } = arch
import Config from './Config.mjs'

export default {
    getProductById: async productId =>
        (await RestClient.get(`http://${Config.productsUrl}:${Config.productsPort}/api/products/${productId}`)).data
        
}