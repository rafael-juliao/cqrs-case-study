export default ({ createOfferService }) => ({
    execute: async offerData => await createOfferService(offerData),
    options: [
        Command.TRANSACTIONAL
    ]
})