export default ({ offersViewModel }) => [{
    event: OFFER_CREATED,
    handler: offersViewModel.create,
}]