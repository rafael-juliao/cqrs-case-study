export default ({ config }) => ({
    [OFFER_CREATED]: { 
        topic: config.events.topics.offer_created
    },
    [OFFER_UPDATE_STATUS]: { 
        topic: config.events.topics.offer_updated
    }
})