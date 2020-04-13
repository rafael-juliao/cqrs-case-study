module.exports = ({ azureServiceBus, message }) => ({
    id: () => message.id,
    body: () => message.body,
    deadletter: () => azureServiceBus.deadletter(),
    complete: () => message.complete()
})