import {
    database,
    messageBroker,
    requestServer
} from 'arch'

import eventHandler from '/core/eventHandler'

const startApplication = async () => {
    await database.connect()
    await messageBroker.subscribe(eventHandler)
}