import Config from '../../.arch/Config.mjs'

export default {
    getProductsByIdList: async list => {
        const response = await axios.get({ baseUrl : Config.productsUrl, data:list })
        
    } 
}