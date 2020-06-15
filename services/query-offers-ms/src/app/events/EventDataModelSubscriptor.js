module.exports = ({
    eventDataModel,
    eventSubscriptor,
}) => ({
    subscribe: async () => {
        for (const { event, operation } of eventDataModel)
            await eventSubscriptor.subscribe(event, operation)
    }
})