const messageBroker = require('./index')
const DomainEventsConfigMapping = require('../../app/commands/DomainEventsConfigMapping')

module.exports = {
    subscribe: (eventHandlers) => {
        for (let { event, handler } of eventHandlers)
            messageBroker.subscribe(DomainEventsConfigMapping[event], handler)
    }
}