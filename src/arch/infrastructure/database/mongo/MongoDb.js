import { MongoClient } from 'mongodb'

export default class {
 
    constructor({ configuration }){
        this.configuration = configuration
    }

    async connect() {
        const {
            connectionUrl,
            databaseName
        } = this.configuration.get('mongodb')

        this.client = new MongoClient(connectionUrl, { useNewUrlParser: true });

        try {
            await this.client.connect()
            const database = client.db(databaseName)
            this._setDatabase(database)
        } catch (err) {
            throw new Error('could not connect to mongodb\n', err)
        }
    }

    _setDatabase(database) {
        Object.assign(this, { 
            collection: entity => database.collection(entity)
        })
    }

    close(){
        this.client.close()
    }
}