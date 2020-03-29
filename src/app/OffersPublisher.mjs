export default {
    publish: (event, offer) => {
        console.log(`Dispatching Event => ${event} | Offer: ${JSON.stringify(offer)}`)
    }
}