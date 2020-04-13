const MongoPersistenceAdapter = require('../../../../lib/database/mongo/src/MongoPersistenceAdapter')
module.exports = MongoPersistenceAdapter({ collectionName: 'products' })