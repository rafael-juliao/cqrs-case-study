import MongoDbPersistenceAdapter from '../../../arch/infrastructure/database/mongo/MongoDbPersistenceAdapter'

export default class extends MongoDbPersistenceAdapter {
    constructor({
        mongoDb
    }){
        super({ entity: Offer, mongoDb })
    }
}