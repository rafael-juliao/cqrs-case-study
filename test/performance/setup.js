const { OffersService, OffersClient, QueryOffersClient } = require('../data')
const { parse } = require('json2csv')
const fs = require('fs')

const setupTest = async() => {
    const [{ _id }] = await OffersService.insertOffers({
        offersConfig: { count: 1, data: { name: 'OFFER' } },
        productsConfig: { data: { name: 'PRODUCT' } },
    })
    const csv = parse([{ offerId: _id }])
    fs.writeFileSync(`${__dirname}/dataset.csv`, csv)
}

setupTest()