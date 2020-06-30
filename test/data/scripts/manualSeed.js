const [
    offersCount = 50,
    productsCount = 5,
] = process.argv.slice(2);
(async () => {
    const CreateOffers = require('../services/OffersService')
    const offers = await CreateOffers.insertOffers({
        offersConfig: {
            count: offersCount
        },
        productsConfig: {
            count: productsCount,
            data: {
                name: 'Camiseta'
            }
        }
    })
    console.log(`Created ${offers.length} offers and ${offers.length*productsCount} products`)
})()