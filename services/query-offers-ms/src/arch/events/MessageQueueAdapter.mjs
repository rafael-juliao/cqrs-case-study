export default ({
    messageBroker
}) => ({
    subscribe: (eventHandlers) => {
        for (let { event, handler, mapper } of eventHandlers){
            messageBroker.subscribe(mapper[event], handler)
        }
    }
})