const { OffersService, OffersClient } = require('../data')
const { expect } = require('chai')

describe('Feature: Search offer by id', () => {

    describe('Given that I have one offer in the database', () => {

        let offerId
        before(async() => {
            const [{ _id }] = await OffersService.insertOffers({
                offersConfig: { count: 1, data: { name: 'OFFER' } },
                productsConfig: { data: { name: 'PRODUCT' } },
            })
            offerId = _id
        })

        context('When I search offer by id with correct id', () => {
            let offer
            before(async() => offer = await OffersClient.getById(offerId))
        
            it('should return the complete offer', done => {
                expect(offer).to.have.property('_id')
                expect(offer._id).to.eq(offerId)
                expect(offer.name).to.eq('OFFER')
                expect(offer.items).to.be.an('array')
                for( let item of offer.items ) {
                    expect(item).to.have.property('quantity')
                    expect(item).to.have.property('product')
                    expect(item.product).to.have.property('_id')
                    expect(item.product).to.have.property('name')
                    expect(item.product.name).to.eq('PRODUCT')
                }
                done()
            })

        })
        
    })
})