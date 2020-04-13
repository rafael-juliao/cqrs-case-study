module.exports = {
    create: ({ params, query }) => (req, res, next) => {
        const errors = []
        
        if (params) {
            const result = Joi.validate(params, req.params)
            if (result.errors)
                errors = result.errors.map(({ details }) => details)
        }
        if (query) {
            const result = Joi.validate(query, req.query)
            if (result.errors)
                errors = [ ...errors, ...result.errors.map(({ details }) => details)]
        }
        if (errors.length)
            return res.status(400).json({ errors }).end()
        
        next()    
    }
}