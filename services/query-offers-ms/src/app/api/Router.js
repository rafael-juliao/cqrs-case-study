
const controller = require('./Controller')
module.exports = [
    {
        route: '/offers/:offerId',
        handler: controller.getOfferById,
        schema: {
            params: Joi.object().keys({
                offerId: Joi.string().required()
            })
        }
    },
    {
        route: '/offers',
        handler: controller.searchOffers,
        schema: {
            query: Joi.object().keys({
                search: Joi.string().optional(),
                status: Joi.string().valid(['active', 'created']).optional(),
                min_price: Joi.number().optional(),
                max_price: Joi.number().optional(),
                page: Joi.number().optional(),
                limit: Joi.number().optional()
            })
        }
    }
]