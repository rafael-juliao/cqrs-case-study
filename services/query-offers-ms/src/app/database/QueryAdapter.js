module.exports = () => ({
    searchOffers = async ({
        search,
        status,
        min_price,
        max_price,
        page = 0,
        limit = 50,
    }) => {
        const query = 
            await persistenceAdapter(DomainEntities.Offer)
                .find({
                    search,
                    status,
                    price: { '$gt': min_price, '$lt': max_price },
                })
                .skip(page*limit)
                .limit(limit)
    }
})