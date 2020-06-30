const { OffersService,  } = require('../data')

const setupTest = async() => {
    const offers = await OffersService.insertOffers({
        offersConfig: { count: 10 },
        productsConfig: { data: { name: 'Camiseta' } },
    })
}

setupTest()