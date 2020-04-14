module.exports = ({ offersPersistence }) => ({

    getOfferById: async offerId => {
        const pipeline = [
            {
                '$match': { _id: offerId }
            },
            {
                '$unwind': { path: '$items' }
            },
            {
                '$lookup':
                    {
                        from: 'products',
                        localField: 'items.product._id',
                        foreignField: '_id',
                        as: 'items.product'
                    }
            },
            {
                '$addFields':
                    {
                        'items.product':{'$arrayElemAt':['$items.product',0]}
                    }
            },
            {
                '$group':
                    {
                        _id : "$_id",
                        object: { 
                            '$first': "$$ROOT"
                        },
                        items: {
                            '$push': '$items'
                        }
                    }
            },
            {
                '$addFields': {
                    'object.items': '$items'
                }
            },
            { 
                '$replaceRoot': { newRoot: '$object' }
            }
        ]
        const [offer] = await offersPersistence.aggregate(pipeline)
        return offer
    }

    /*searchOffers: async ({
        search,
        status,
        min_price,
        max_price,
        page = 0,
        limit = 50,
    }) => {

        const query = {
            search,
            status,
            price: { '$gt': min_price, '$lt': max_price },
        }

        const result = await offersPersistenceAdapter.aggregate()
    }*/

})