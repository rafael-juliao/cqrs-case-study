module.exports = (channel, message) => {
    const body = JSON.parse(message.content.toString())
    return {
        getId: () => message.id,
        getBody: () => body,
        sendToDeadLetter: () => channel.reject(message, false),
        complete: () => channel.ack(message)
    }
}