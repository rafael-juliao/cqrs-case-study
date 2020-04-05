const { OffersService } = require('../data')

describe('Given that I have 100 offers, and 10 of those contains products with name equal "PRODUCT_A"', () => {
    before(async () => {
        await OffersService.insertOffers({
            offersConfig: { count: 90 },
        })
        await OffersService.insertOffers({
            offersConfig: { count: 10, data: { name: 'OFFER_A' } },
            productsConfig: { data: { name: 'PRODUCT_A' } },
        })
    })
    context('when I search a offers by text with string "PRODUCT_A"', () => {
        it('should return 10 offers that contains products with name equal "PRODUCT_A"', () => {

        })
    })
})