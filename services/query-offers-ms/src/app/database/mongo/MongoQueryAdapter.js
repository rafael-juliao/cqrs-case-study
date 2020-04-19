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
    },

    searchOffers: async ({
        search,
        status,
        page = 0,
        limit = 50,
    }) => {

        page = Number(page)
        limit = Number(limit)

        const pipeline = []

        status && pipeline.push({
            '$match': { status }
        })
       
        pipeline.push(...[
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
            },
        ])

        search && pipeline.push({
            '$match': {
                '$or': [
                    { items: { '$elemMatch': { 'product.name': { $regex: new RegExp(search, 'i') } } } }, 
                    { items: { '$elemMatch': { 'product.brand': { $regex: new RegExp(search, 'i') } } } }
                ]
            }
        }) 

        pipeline.push(
            { 
                '$facet': {
                    count:  [{ '$count': "total" }],
                    offers: [
                        { '$skip': page*limit },
                        { '$limit': limit }
                    ]
                }
            }
        )

        const [{ count: [counter], offers }] = await offersPersistence.aggregate(pipeline)
        return {
            page,
            limit,
            total: counter ? counter.total : 0,
            offers
        }
    }

})