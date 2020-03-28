export default ({ rabbitPublisher, rabbitQueueMapper }) => ({
    publish: ({ 
        event,
        message
    }) => {
        const queue = rabbitQueueMapper[event]
        rabbitPublisher.publish({ message, queue })
    }
})