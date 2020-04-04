export default ({ config }) => ({
    [OFFER_CREATED]: config.events.offer_created,
    [OFFER_UPDATE_STATUS]: config.events.offer_updated
})