export default ({
    messageBrokerAdapter
}) => ({
    subscribe: (eventHandlers) => {
        for (let { event, handler } of eventHandlers){
            messageBrokerAdapter.subscribe(event, handler)
        }
    }
})