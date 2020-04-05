import Config from '../../.arch/src/Config.mjs'
import RestClient from '../../.arch/src/RestClient.mjs'

export default {
    getProductById: async productId =>
        (await RestClient.get(`http://${Config.productsUrl}:${Config.productsPort}/api/products/${productId}`)).data
        
}