module.exports = ({
    getOfferById: offerId => [
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
    ],


    searchOffers: ({
        search,
        status,
        page,
        limit,
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
        
        return pipeline
    }

})