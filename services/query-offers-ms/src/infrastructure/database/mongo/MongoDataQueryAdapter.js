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
            promotion
        }) => {
            const pipeline = pipelines.searchOffers({
                search,
                promotion
            })
            const offers = await offersModel.aggregate(pipeline)
            return offers
        }
    
    }
}