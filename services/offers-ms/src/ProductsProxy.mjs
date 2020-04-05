import Config from '../../.arch/src/Config.mjs'
import RestClient from '../../.arch/src/RestClient.mjs'

export default {
    getProductById: async productId => {
        const url = `http://${Config.productsUrl}:${Config.productsPort}/api/products/${productId}`
        console.log(url)
        const response = await RestClient.get(url)
        console.log(response.data)
        return response.data
    }
        
}