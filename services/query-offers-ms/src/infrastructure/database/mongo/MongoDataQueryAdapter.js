const pipelines = require('./MongoQueryPipelines')

module.exports = ({ mongoModelFactory }) => {
    const offersModel = mongoModelFactory.create('offers')
    return {
        getOfferById: async offerId => {
            const pipeline = pipelines.getOfferById(offerId)
            const [offer] = await offersModel.aggregate(pipeline)
            return offer
        },
    
        searchOffers: async ({
            search,
            status,
            page = 0,
            limit = 50,
        }) => {
            const pipeline = pipelines.searchOffers({
                search,
                status,
                page,
                limit
            })
            const [{ count: [counter], offers }] = await offersModel.aggregate(pipeline)
            return {
                page,
                limit,
                total: counter ? counter.total : 0,
                offers
            }
        }
    
    }
}