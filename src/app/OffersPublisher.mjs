import RabbitMQ from '../arch/RabbitMQ.mjs'

export default {
    publish: (event, offer) => RabbitMQ.publish(event, offer)
}