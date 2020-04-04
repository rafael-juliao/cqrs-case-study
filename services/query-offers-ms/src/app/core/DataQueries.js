module.exports = ({ persistenceAdapter }) => ({
    search: query => persistenceAdapter.search(query)
})