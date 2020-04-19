const Joi = require('@hapi/joi')

module.exports = ({ queryController }) => [
    {
        path: '/offers/:offerId',
        handler: queryController.getOfferById,
        schema: {
            params: Joi.object().keys({
                offerId: Joi.string().required()
            })
        }
    },
    {
        path: '/offers',
        handler: queryController.searchOffers,
        schema: {
            query: Joi.object().keys({
                search: Joi.string().optional(),
                status: Joi.string().valid('active', 'created').optional(),
                min_price: Joi.number().optional(),
                max_price: Joi.number().optional(),
                page: Joi.number().optional(),
                limit: Joi.number().optional()
            })
        }
    }
]