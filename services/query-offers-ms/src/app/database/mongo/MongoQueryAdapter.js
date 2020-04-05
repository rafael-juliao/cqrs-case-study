module.exports = ({ offersPersistenceAdapter }) => ({

    getOfferById: async offer_id => {
        await offersPersistenceAdapter.aggregate(offer_id)
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