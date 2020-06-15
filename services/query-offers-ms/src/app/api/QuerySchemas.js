const Joi = require('@hapi/joi')

module.exports = {
    getOfferById: {
        params: Joi.object().keys({
            offerId: Joi.string().required()
        })
    },
    searchOffers: {
        query: Joi.object().keys({
            search: Joi.string().optional(),
            status: Joi.string().valid('active', 'created').optional()
        })
    }
}