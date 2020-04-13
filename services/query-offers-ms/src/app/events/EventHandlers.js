const Events = require('./DomainEvents')

module.exports = ({ dataViewModel }) => [
    {
        event: Events.OFFER_CREATED,
        handler: dataViewModel.createOffer,
    },
    {
        event: Events.OFFER_UPDATED,
        handler: dataViewModel.updateOffer,
    },
    {
        event: Events.OFFER_STATUS_CHANGED,
        handler: dataViewModel.offerStatusChanged,
    },
    {
        event: Events.PRODUCT_CREATED,
        handler: dataViewModel.createProduct,
    },
    {
        event: Events.PRODUCT_UPDATED,
        handler: dataViewModel.updateProduct,
    },
    {
        event: Events.PRODUCT_STATUS_CHANGED,
        handler: dataViewModel.productStatusChanged,
    },
]