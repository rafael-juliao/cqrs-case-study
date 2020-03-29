export default ({ offersRepository }) =>
    async offerId => await offersRepository.getById(offerId)