module.exports = ({ persistenceAdapter }) => ({
    searchOffers: ({ query }) => await persistenceAdapter.search(query)
})