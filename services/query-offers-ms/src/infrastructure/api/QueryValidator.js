const Joi = require('@hapi/joi')
const ExpressValidator = require('@rafael-juliao/joi-express-middleware')

module.exports = () => ({
    getOfferById: ExpressValidator({
        params: Joi.object().keys({
            offerId: Joi.string().required()
        })
    }),
    searchOffers: ExpressValidator({
        query: Joi.object().keys({
            search: Joi.string().optional(),
            promotion: Joi.string().valid('true', 'false').optional()
        })
    })
})