module.exports = ({
    eventDataModel,
    eventSubscriptor,
}) => ({
    subscribe: async () => {
        for (const { event, operation } of eventDataModel)
            await eventSubscriptor.subscribe(event, operation)
    },
    unsubscribe: async () => {
        for (const { event } of eventDataModel)
            await eventSubscriptor.unsubscribe(event)
    }
})