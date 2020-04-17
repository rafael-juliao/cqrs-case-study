const { MongoPersistenceAdapter } = require('@rafael-juliao/lib-cqrs-mongo')
module.exports = MongoPersistenceAdapter({ collectionName: 'offers' })