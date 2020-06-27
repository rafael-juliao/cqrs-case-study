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
        promotion,
    }) => {

        const pipeline = []

        promotion && pipeline.push({
            '$match': { promotion }
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
        
        return pipeline
    }

})