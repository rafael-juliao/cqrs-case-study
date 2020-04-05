
(async () => {
    const CreateOffers = require('../services/OffersService')
    await CreateOffers.insertOffers({
        offersConfig: {
            count: 100
        }
    })
})()