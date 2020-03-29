export default class {
    constructor({
        mongoDb,
        entity,
    }){
        this.collection = mongoDb.collection(entity)
    }

    async create(entity) {
        return await this.collection.insertOne(entity)
    }

    async getById(query) {
        return await this.collection.findOne(query)
    }
}