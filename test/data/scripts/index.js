
(async () => {
    const CreateOffers = require('../services/CreateOffers')
    await CreateOffers({
        offers: {
            count: 100000
        }
    })
})()