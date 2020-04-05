export default ({ domainViewModel }) => [
    {
        event: OFFER_CREATED,
        handler: domainViewModel.createOffer,
    },
    {
        event: OFFER_UPDATED,
        handler: domainViewModel.updateOffer,
    },
    {
        event: OFFER_STATUS_CHANGED,
        handler: domainViewModel.offerStatusChanged,
    },
    {
        event: PRODUCT_CREATED,
        handler: domainViewModel.createProduct,
    },
    {
        event: PRODUCT_UPDATED,
        handler: domainViewModel.updateProduct,
    },
    {
        event: PRODUCT_STATUS_CHANGED,
        handler: domainViewModel.productStatusChanged,
    },
]